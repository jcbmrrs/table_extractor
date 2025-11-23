# Trivia Questions Table Extractor

A Google Apps Script tool that automatically extracts trivia questions from Google Docs and populates them into Google Sheets.

## Overview

This script processes trivia question documents stored in Google Drive, extracting three types of questions:
- **Bonus Questions** (Table 2 → Sheet 0)
- **Game One Questions** (Table 0 → Sheet 1)
- **Game Two Questions** (Table 1 → Sheet 2)

Files are marked as "starred" after processing to prevent duplicate entries.

## Features

- **Automatic Processing**: Processes all unstarred files in the "Trivia Questions" folder
- **Smart Skipping**: Skips header and separator rows specific to each question type
- **Error Handling**: Continues processing files even if individual files fail
- **Duplicate Prevention**: Uses file starring to track processed documents
- **Date Extraction**: Automatically extracts dates from document filenames

## Setup

### Prerequisites

- Google Account with access to Google Drive, Docs, and Sheets
- A Google Spreadsheet to store the questions
- A Google Drive folder named "Trivia Questions"

### Installation

1. Open [Google Apps Script](https://script.google.com/)
2. Create a new project
3. Copy the contents of `addBonusQuestions.gs` into the script editor
4. Update the `SPREADSHEET_URL` constant with your target spreadsheet URL
5. Save the project

### Configuration

Update these constants at the top of the script:

```javascript
var SPREADSHEET_URL = 'YOUR_SPREADSHEET_URL_HERE';
var FOLDER_NAME = "Trivia Questions";
```

## Document Format Requirements

### Filename Format
Documents should follow this naming pattern:
```
[word] [word] [word] MM-DD-YY [...]
```
Example: `Trivia Night Questions 03-15-24 Final`

The date (4th space-separated element) will be extracted and parsed.

### Document Structure
Each document must contain exactly 3 tables:
- **Table 0**: Game One Questions
- **Table 1**: Game Two Questions
- **Table 2**: Bonus Questions

Each table should have 4 columns of data.

## Usage

### Manual Execution

1. Open your Google Apps Script project
2. Select the `getFiles` function from the dropdown
3. Click the "Run" button
4. Grant necessary permissions when prompted

### Automated Execution (Optional)

Set up a time-driven trigger:
1. In Apps Script editor, click the clock icon (Triggers)
2. Click "+ Add Trigger"
3. Choose `getFiles` function
4. Select time-driven trigger type
5. Configure your desired schedule (e.g., daily, weekly)

## How It Works

1. **Scan Folder**: Searches for folders named "Trivia Questions"
2. **Find Unprocessed Files**: Iterates through files that aren't starred
3. **Extract Data**: For each file:
   - Extracts the date from the filename
   - Opens the document and retrieves tables
   - Filters out header/separator rows
   - Appends question data to the appropriate sheet
4. **Mark Complete**: Stars the file to prevent reprocessing
5. **Error Handling**: Logs errors and continues with remaining files

## Code Structure

### Main Functions

- `getFiles()` - Main entry point that processes all unstarred files
- `addBonusQuestions(file)` - Processes bonus questions from Table 2
- `addGameOneQuestions(file)` - Processes Game One questions from Table 0
- `addGameTwoQuestions(file)` - Processes Game Two questions from Table 1

### Helper Functions

- `extractDate(doc)` - Parses date from document name
- `getRowData(row)` - Extracts cell text from table row
- `addQuestionsToSheet(...)` - Generic function for table-to-sheet transfer

## Row Skipping Logic

Different question types skip different rows:

- **Bonus Questions**: Skips row 0 (header)
- **Game One**: Skips rows 0, 1, 7, 13, 14 (headers and separators)
- **Game Two**: Skips rows 0, 6, 12 (headers and separators)

## Optimization Highlights

This script has been optimized for:
- **DRY Principle**: Consolidated duplicate code into a single generic function
- **Maintainability**: Configuration constants at the top for easy updates
- **Error Resilience**: Try-catch blocks prevent individual file failures from stopping batch processing
- **Documentation**: JSDoc comments for all functions
- **Clean Code**: Removed commented-out code and improved formatting

## Troubleshooting

### Permission Errors
Ensure the script has authorization to access:
- Google Drive (read files)
- Google Docs (read content)
- Google Sheets (write data)

### Date Parsing Fails
Verify filename format matches: `... ... ... MM-DD-YY ...`

### Missing Tables
Ensure documents contain exactly 3 tables in the expected order

### Duplicate Entries
The script only processes unstarred files. If you need to reprocess a file:
1. Unstar the file in Google Drive
2. Run the script again

## License

See LICENSE file for details.

## Contributing

To modify row skipping logic, update these constants:
```javascript
var SKIP_ROWS_BONUS = [0];
var SKIP_ROWS_GAME_ONE = [0, 1, 7, 13, 14];
var SKIP_ROWS_GAME_TWO = [0, 6, 12];
```

To change which tables map to which sheets, update:
```javascript
var SHEET_BONUS = 0;        // Target sheet index
var TABLE_BONUS = 2;        // Source table index
```
