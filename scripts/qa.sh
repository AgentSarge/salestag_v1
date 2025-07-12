#!/bin/bash

ROUTES=(
  "vault"
  "alignment"
  "agents"
  "foundry"
  "use-cases"
  "demo"
  "faq"
  "whitepaper"
  "playbooks"
  "legal/data-use"
  "legal/terms"
  "legal/privacy"
  "legal/cookies"
)

for route in "${ROUTES[@]}"; do
  curl -s -o /dev/null -w "$route: %{http_code}\n" http://localhost:4321/$route
  # Optionally, add a short sleep if needed: sleep 0.2
  # Remove the above line if not needed
  # sleep 0.2
  # Uncomment the above line if you want to avoid hammering the server
  # echo "Checked $route"
done 