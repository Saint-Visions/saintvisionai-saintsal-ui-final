#!/bin/bash

# ✅ Patch react-syntax-highlighter back in if previously commented
sed -i '' "s|// react-syntax-highlighter|react-syntax-highlighter|g" components/messages/message-codeblock.tsx
sed -i '' "s|// react-syntax-highlighter|react-syntax-highlighter|g" components/sidebar/items/all/sidebar-update-item.tsx
sed -i '' "s|// react-syntax-highlighter|react-syntax-highlighter|g" components/sidebar/items/assistants/assistant-item.tsx

echo "✅ Imports restored. Now run: npm run build"

