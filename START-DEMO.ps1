param(
  [ValidateSet("roles", "users")]
  [string]$Demo = "roles",
  [int]$Port = 4175
)

$python = "C:\Users\gianm\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$path = if ($Demo -eq "roles") { "ref-001-roles" } else { "ref-006-users" }

Start-Process "$(Join-Path $root $path)\index.html"
