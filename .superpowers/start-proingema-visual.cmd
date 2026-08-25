@echo off
set "BRAINSTORM_DIR=D:\niki\.superpowers\brainstorm\proingema-redesign"
set "BRAINSTORM_HOST=127.0.0.1"
set "BRAINSTORM_URL_HOST=localhost"
set "BRAINSTORM_PORT_FILE=D:\niki\.superpowers\brainstorm\.last-port"
set "BRAINSTORM_TOKEN_FILE=D:\niki\.superpowers\brainstorm\.last-token"
set "BRAINSTORM_OWNER_PID="
set "BRAINSTORM_OPEN=1"
set "BRAINSTORM_IDLE_TIMEOUT_MS=14400000"
"C:\Users\jef_o\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" "C:\Users\jef_o\.codex\plugins\cache\openai-curated-remote\superpowers\6.2.0\skills\brainstorming\scripts\server.cjs" 1>"D:\niki\.superpowers\brainstorm\proingema-redesign\state\server.log" 2>&1
