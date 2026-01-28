#!/bin/bash

OLD_TEXT=".js"
NEW_TEXT=""

sed -i "s/$OLD_TEXT/$NEW_TEXT/g" generated/prisma/*.ts
sed -i "s/$OLD_TEXT/$NEW_TEXT/g" generated/prisma/internal/*.ts
sed -i "s/$OLD_TEXT/$NEW_TEXT/g" generated/prisma/models/*.ts

sed -i "1d" generated/prisma/*.ts
sed -i "1d" generated/prisma/internal/*.ts
sed -i "1d" generated/prisma/models/*.ts