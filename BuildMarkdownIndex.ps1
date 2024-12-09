# Set the root directory to the current location or a specified path
$RootDir = Get-Location

# Output file for the index
$OutputFile = Join-Path -Path $RootDir -ChildPath "_sidebar.md"

# Get all .md files recursively, excluding those in the root folder
$MarkdownFiles = Get-ChildItem -Path $RootDir -Recurse -File -Filter "*.md" | Where-Object {
    $_.DirectoryName -ne $RootDir
}

# Create or overwrite the output file
Set-Content -Path $OutputFile -Value ""

# Iterate through each file and write its relative path as a markdown link
foreach ($File in $MarkdownFiles) {
    # Calculate the full relative path
    $RelativePath = Resolve-Path -Path $File.FullName -Relative | Out-String
    $RelativePath = $RelativePath.Trim()


    # Convert to web path
    $WebPath = $RelativePath -replace "\\", "/"

    # Remove leading "." if present
    if ($WebPath.StartsWith(".")) {
        $WebPath = $WebPath.Substring(1)
    }


    # Prepare the link text
    if ($WebPath -match "^(.*)/README\.md$") {
        # If the file is README.md, use only the folder name
        $LinkText = $Matches[1] -replace "/", " > "
    } else {
        # Remove the .md extension and replace "/" with " > "
        $LinkText = ($WebPath -replace "\.md$", "") -replace "/", " > "
    }

    if ($LinkText.StartsWith(" > ")) {
        $LinkText = $LinkText.Substring(3)
    } 

    # Create the markdown link
    $MarkdownLink = "* [$LinkText]($WebPath)"

    # Append the link to the output file
    Add-Content -Path $OutputFile -Value $MarkdownLink
}

Write-Host "Markdown index created at: $OutputFile"
