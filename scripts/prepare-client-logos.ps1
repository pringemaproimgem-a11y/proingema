$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$source = @'
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

public static class ClientLogoPreparer
{
    private static Rectangle GetAlphaBounds(Bitmap bitmap)
    {
        Rectangle rect = new Rectangle(0, 0, bitmap.Width, bitmap.Height);
        BitmapData data = bitmap.LockBits(rect, ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
        try
        {
            int stride = Math.Abs(data.Stride);
            byte[] pixels = new byte[stride * data.Height];
            Marshal.Copy(data.Scan0, pixels, 0, pixels.Length);
            int minX = bitmap.Width;
            int minY = bitmap.Height;
            int maxX = -1;
            int maxY = -1;

            for (int y = 0; y < bitmap.Height; y++)
            {
                int row = y * stride;
                for (int x = 0; x < bitmap.Width; x++)
                {
                    if (pixels[row + x * 4 + 3] == 0) continue;
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                }
            }

            if (maxX < minX || maxY < minY)
            {
                throw new InvalidOperationException("The logo has no visible pixels: " + bitmap.Tag);
            }

            return Rectangle.FromLTRB(minX, minY, maxX + 1, maxY + 1);
        }
        finally
        {
            bitmap.UnlockBits(data);
        }
    }

    public static void Prepare(string sourcePath, string destinationPath, int padding, int maxEdge)
    {
        using (Bitmap original = new Bitmap(sourcePath))
        using (Bitmap argb = new Bitmap(original.Width, original.Height, PixelFormat.Format32bppArgb))
        {
            argb.Tag = sourcePath;
            using (Graphics canvas = Graphics.FromImage(argb))
            {
                canvas.Clear(Color.Transparent);
                canvas.DrawImageUnscaled(original, 0, 0);
            }

            Rectangle art = GetAlphaBounds(argb);
            Rectangle crop = Rectangle.FromLTRB(
                Math.Max(0, art.Left - padding),
                Math.Max(0, art.Top - padding),
                Math.Min(argb.Width, art.Right + padding),
                Math.Min(argb.Height, art.Bottom + padding)
            );
            double scale = Math.Min(1.0, (double)maxEdge / Math.Max(crop.Width, crop.Height));
            int width = (int)Math.Round(crop.Width * scale);
            int height = (int)Math.Round(crop.Height * scale);

            using (Bitmap output = new Bitmap(width, height, PixelFormat.Format32bppArgb))
            {
                using (Graphics graphics = Graphics.FromImage(output))
                {
                    graphics.Clear(Color.Transparent);
                    graphics.CompositingQuality = CompositingQuality.HighQuality;
                    graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;
                    graphics.DrawImage(
                        argb,
                        new Rectangle(0, 0, width, height),
                        crop,
                        GraphicsUnit.Pixel
                    );
                }

                Directory.CreateDirectory(Path.GetDirectoryName(destinationPath));
                output.Save(destinationPath, ImageFormat.Png);
            }
        }
    }
}
'@

Add-Type -TypeDefinition $source -ReferencedAssemblies System.Drawing

$sourceDirectory = "D:\brochure pro ingema\logos"
$destinationDirectory = "D:\niki\public\images\clients"
$logos = @(
    @{ Source = "1.png"; Destination = "plan-copesco.png" },
    @{ Source = "2.png"; Destination = "gore-cusco.png" },
    @{ Source = "3.png"; Destination = "provias-descentralizado.png" },
    @{ Source = "4.png"; Destination = "gore-apurimac.png" },
    @{ Source = "5.png"; Destination = "pescs.png" },
    @{ Source = "6.png"; Destination = "gore-madre-de-dios.png" },
    @{ Source = "7.png"; Destination = "ima.png" }
)

foreach ($logo in $logos) {
    [ClientLogoPreparer]::Prepare(
        (Join-Path $sourceDirectory $logo.Source),
        (Join-Path $destinationDirectory $logo.Destination),
        64,
        900
    )
}
