# n8n AI Project Generator

Automation project that generates structured technical project plans from budget spreadsheets using n8n, AI, and Google Docs integration.

## Overview

This project transforms raw budget spreadsheet data into a complete professional project plan, including:

- Project title
- Description
- General objective
- Specific objectives
- Justification
- Methodology (structured and compliant)
- Target audience (when available)

The system ensures that the AI does not invent information and strictly follows the provided data.

## Technologies

- n8n (workflow automation)
- JavaScript (code nodes)
- OpenRouter / OpenAI (LLM)
- Google Sheets API
- Google Docs API
- Google Drive API

## Features

- Automated reading and structuring of spreadsheet data
- Intelligent grouping of resources into execution strategies
- AI-generated technical writing (non-generic, non-hallucinated)
- Strict validation to prevent invented content
- Automatic calculation of total project value
- Dynamic document generation in Google Docs

## Key Concept

The AI does NOT create fictional content.  
It translates structured budget data into a professional project document.

## Security

This repository does NOT include:
- API keys
- Credentials
- Real client data

## Status

Portfolio project — production-ready logic, demo environment.

## Author

Created by Brenda Espinosa
