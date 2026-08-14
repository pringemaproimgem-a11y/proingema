Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$maxSide = 1800
$jpegQuality = 84L
$destinationDir = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\public\images\field-work'))
New-Item -ItemType Directory -Force -Path $destinationDir | Out-Null

$photos = @(
  @{ Source = 'D:\brochure pro ingema\jpg\IMG_2442.jpg'; Output = 'calicata-interior-01.jpg' },
  @{ Source = 'D:\brochure pro ingema\jpg\IMG_1354.jpg'; Output = 'calicata-via-urbana-01.jpg' },
  @{ Source = 'D:\brochure pro ingema\jpg\IMG_1365.jpg'; Output = 'calicata-via-urbana-02.jpg' },
  @{ Source = 'D:\brochure pro ingema\jpg\IMG_1374.jpg'; Output = 'calicata-via-urbana-03.jpg' },
  @{ Source = 'D:\brochure pro ingema\jpg\IMG_1388.jpg'; Output = 'calicata-via-urbana-04.jpg' },
  @{ Source = 'D:\brochure pro ingema\jpg\IMG_1389.jpg'; Output = 'calicata-via-urbana-05.jpg' },
  @{ Source = 'D:\brochure pro ingema\jpg\IMG_2759.jpg'; Output = 'calicata-local-comercial-01.jpg' },
  @{ Source = 'D:\brochure pro ingema\jpg\IMG_2379.jpg'; Output = 'calicata-vivienda-rural-01.jpg' },
  @{ Source = 'D:\brochure pro ingema\jpg\IMG_2758.jpg'; Output = 'calicata-local-comercial-02.jpg' },
  @{ Source = 'D:\brochure pro ingema\jpg\IMG_2464.jpg'; Output = 'calicata-institucion-01.jpg' },
  @{ Source = 'D:\brochure pro ingema\jpg\IMG_2706.jpg'; Output = 'calicata-infraestructura-deportiva-01.jpg' },
  @{ Source = 'D:\brochure pro ingema\jpg\IMG_2363.jpg'; Output = 'calicata-vivienda-rural-02.jpg' },
  @{ Source = 'D:\brochure pro ingema\jpg\IMG_2380.jpg'; Output = 'calicata-vivienda-rural-03.jpg' },
  @{ Source = 'D:\brochure pro ingema\jpg\IMG_1353.jpg'; Output = 'calicata-via-urbana-06.jpg' },
  @{ Source = 'D:\brochure pro ingema\jpg\IMG_1084.jpg'; Output = 'calicata-via-urbana-07.jpg' },
  @{ Source = 'D:\brochure pro ingema\jpg\IMG_1259.jpg'; Output = 'calicata-planta-concreto-01.jpg' },
  @{ Source = 'D:\brochure pro ingema\jpg\IMG_2463.jpg'; Output = 'calicata-institucion-02.jpg' },
  @{ Source = 'D:\brochure pro ingema\jpg\IMG_1254.jpg'; Output = 'calicata-planta-concreto-02.jpg' },
  @{ Source = 'D:\brochure pro ingema\jpg\IMG_1261.jpg'; Output = 'calicata-planta-concreto-03.jpg' },
  @{ Source = 'D:\brochure pro ingema\Fotos y videos\ENSAYOS DE DENSIDAD DE CAMPO EN VIAS\9555fec1-a14f-435d-859e-af9f2c25f037.jpg'; Output = 'densidad-via-vimpampa-01.jpg' },
  @{ Source = 'D:\brochure pro ingema\Fotos y videos\ENSAYOS DE DENSIDAD DE CAMPO EN VIAS\b3504460-c663-45d4-98b7-1af426787c64.jpg'; Output = 'densidad-via-vimpampa-02.jpg' },
  @{ Source = 'D:\brochure pro ingema\Fotos y videos\ENSAYOS DE DENSIDAD DE CAMPO EN VIAS\bd5c8555-d256-424f-808a-b41846eb911a.jpg'; Output = 'densidad-via-vimpampa-03.jpg' },
  @{ Source = 'D:\brochure pro ingema\Fotos y videos\ENSAYOS DE DENSIDAD DE CAMPO EN VIAS\958e2d2b-098e-432b-8e91-8061ef029cc5.jpg'; Output = 'densidad-obra-vial-01.jpg' },
  @{ Source = 'D:\brochure pro ingema\Fotos y videos\ENSAYOS DE DENSIDAD DE CAMPO EN VIAS\af1d46a4-a1be-43bd-813d-d6505bec3a46.jpg'; Output = 'densidad-obra-vial-02.jpg' },
  @{ Source = 'D:\brochure pro ingema\Fotos y videos\ENSAYOS DE DENSIDAD DE CAMPO EN VIAS\b91bcf1c-80e5-4805-a6ad-ce300fe99baf.jpg'; Output = 'densidad-obra-vial-03.jpg' }
)

function Set-ExifOrientation([System.Drawing.Image]$image) {
  try {
    $orientationProperty = $image.GetPropertyItem(0x0112)
    $orientation = [System.BitConverter]::ToUInt16($orientationProperty.Value, 0)
    switch ($orientation) {
      3 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
      6 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
      8 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
    }
  }
  catch [System.ArgumentException] {
  }
}

function Get-ScaledSize([int]$width, [int]$height) {
  $scale = [Math]::Min(1.0, $maxSide / [double][Math]::Max($width, $height))
  return @(
    [Math]::Max(1, [int][Math]::Round($width * $scale)),
    [Math]::Max(1, [int][Math]::Round($height * $scale))
  )
}

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object MimeType -eq 'image/jpeg' |
  Select-Object -First 1

if (-not $jpegCodec) {
  throw 'No se encontró un codificador JPEG en System.Drawing.'
}

$destinationPrefix = $destinationDir.TrimEnd([System.IO.Path]::DirectorySeparatorChar) + [System.IO.Path]::DirectorySeparatorChar
$prepared = 0

foreach ($photo in $photos) {
  $sourcePath = [System.IO.Path]::GetFullPath($photo.Source)
  if (-not (Test-Path -LiteralPath $sourcePath -PathType Leaf)) {
    throw "No existe la fotografía fuente: $sourcePath"
  }

  $outputPath = [System.IO.Path]::GetFullPath((Join-Path $destinationDir $photo.Output))
  if (-not $outputPath.StartsWith($destinationPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "La salida está fuera del directorio permitido: $outputPath"
  }

  $temporaryPath = "$outputPath.tmp.jpg"
  $sourceImage = $null
  $bitmap = $null
  $graphics = $null
  $encoderParameters = $null

  try {
    $sourceImage = [System.Drawing.Image]::FromFile($sourcePath)
    Set-ExifOrientation $sourceImage
    $scaledSize = Get-ScaledSize $sourceImage.Width $sourceImage.Height

    $bitmap = [System.Drawing.Bitmap]::new(
      $scaledSize[0],
      $scaledSize[1],
      [System.Drawing.Imaging.PixelFormat]::Format24bppRgb
    )
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.Clear([System.Drawing.Color]::White)
    $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.DrawImage($sourceImage, 0, 0, $scaledSize[0], $scaledSize[1])

    $encoderParameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
    $encoderParameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new(
      [System.Drawing.Imaging.Encoder]::Quality,
      $jpegQuality
    )
    $bitmap.Save($temporaryPath, $jpegCodec, $encoderParameters)
  }
  finally {
    if ($encoderParameters) { $encoderParameters.Dispose() }
    if ($graphics) { $graphics.Dispose() }
    if ($bitmap) { $bitmap.Dispose() }
    if ($sourceImage) { $sourceImage.Dispose() }
  }

  Move-Item -LiteralPath $temporaryPath -Destination $outputPath -Force
  $outputInfo = Get-Item -LiteralPath $outputPath
  Write-Host ("{0} -> {1} ({2} x {3}, {4:N0} KB)" -f
    [System.IO.Path]::GetFileName($sourcePath),
    $photo.Output,
    $scaledSize[0],
    $scaledSize[1],
    ($outputInfo.Length / 1KB)
  )
  $prepared += 1
}

Write-Host "$prepared fotografías preparadas"
