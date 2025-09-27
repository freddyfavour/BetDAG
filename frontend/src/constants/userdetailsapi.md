Base

\- Base URL (local): https://blockdag-p7cb.onrender.com/

\- Default headers: Content-Type: application/json



Root

\- GET /

&nbsp; - Response: 200 text/plain

&nbsp;   Body: "Blockdag endpoint"



User routes (mounted at /user)

\- POST /user/register

&nbsp; - Purpose: create or update user

&nbsp; - Request JSON:

&nbsp;   { "wallet": "0x1234...", "username": "playerName", "avatar": "<optional url>" }

&nbsp; - Success 200 -> user object:

&nbsp;   {

&nbsp;     "\_id": "...",

&nbsp;     "wallet": "0x1234...",

&nbsp;     "username": "playerName",

&nbsp;     "avatar": "<url>",

&nbsp;     "wins": 0,

&nbsp;     "losses": 0,

&nbsp;     "earnings": 0,

&nbsp;     "history": \[],

&nbsp;     "\_\_v": 0

&nbsp;   }

&nbsp; - Errors:

&nbsp;   400 { "error": "Wallet and username required" }

&nbsp;   400 { "message": "username already chosen" }

&nbsp;   500 { "error": "<error message>" }



\- POST /user/recordWin

&nbsp; - Purpose: increment wins and add earnings

&nbsp; - Request JSON:

&nbsp;   { "wallet": "0x1234...", "amountWon": 25.5 }

&nbsp; - Success 200 -> updated user object

&nbsp; - Errors:

&nbsp;   404 { "error": "User not found" }

&nbsp;   500 { "error": "<error message>" }



\- POST /user/recordLoss

&nbsp; - Purpose: increment losses

&nbsp; - Request JSON:

&nbsp;   { "wallet": "0x1234..." }

&nbsp; - Success 200 -> updated user object

&nbsp; - Errors: same as recordWin



\- GET /user/:wallet

&nbsp; - Purpose: fetch user by wallet

&nbsp; - Example: GET /user/0x1234...

&nbsp; - Success 200 -> user object

&nbsp; - Errors:

&nbsp;   404 { "error": "User not found" }



Leaderboard routes (mounted at /leaderboard)

\- GET /leaderboard/earnings

&nbsp; - Purpose: list users sorted by earnings (DESC)

&nbsp; - Success 200 -> array of user objects:

&nbsp;   \[

&nbsp;     { "wallet":"0xA...", "username":"top1", "wins":10, "losses":2, "earnings":1200, "avatar":"<url>" },

&nbsp;     ...

&nbsp;   ]

&nbsp; - Error 500 { "error": "<error message>" }



\- GET /leaderboard/wins

&nbsp; - Purpose: list users sorted by wins (DESC)

&nbsp; - Success 200 -> same shape as earnings



\- GET /leaderboard/losses

&nbsp; - Purpose: list users sorted by losses (DESC)

&nbsp; - Success 200 -> same shape as earnings



\- GET /leaderboard/winrate

&nbsp; - Purpose: list users sorted by win rate (wins / (wins+losses), DESC)

&nbsp; - Success 200 -> array of objects:

&nbsp;   \[

&nbsp;     { "wallet":"0xA...", "username":"top1", "wins":10, "losses":2, "winrate":0.833, "earnings":1200 },

&nbsp;     ...

&nbsp;   ]

&nbsp; - Error 500 { "error": "<error message>" }



Model summary (user)

\- Fields returned in responses:

&nbsp; wallet (string), username (string), avatar (string), wins (number), losses (number), earnings (number), history (array)



Notes

\- All endpoints return JSON unless noted.

\- If you want, I can export this as a Postman collection or a Markdown API doc.



```// filepath: c:\\Users\\Hp\\OneDrive\\Documents\\BlockDAG\\test.txt



Base

\- Base URL (local): http://localhost:5000

\- Default headers: Content-Type: application/json



Root

\- GET /

&nbsp; - Response: 200 text/plain

&nbsp;   Body: "Blockdag endpoint"



User routes (mounted at /user)

\- POST /user/register

&nbsp; - Purpose: create or update user

&nbsp; - Request JSON:

&nbsp;   { "wallet": "0x1234...", "username": "playerName", "avatar": "<optional url>" }

&nbsp; - Success 200 -> user object:

&nbsp;   {

&nbsp;     "\_id": "...",

&nbsp;     "wallet": "0x1234...",

&nbsp;     "username": "playerName",

&nbsp;     "avatar": "<url>",

&nbsp;     "wins": 0,

&nbsp;     "losses": 0,

&nbsp;     "earnings": 0,

&nbsp;     "history": \[],

&nbsp;     "\_\_v": 0

&nbsp;   }

&nbsp; - Errors:

&nbsp;   400 { "error": "Wallet and username required" }

&nbsp;   400 { "message": "username already chosen" }

&nbsp;   500 { "error": "<error message>" }



\- POST /user/recordWin

&nbsp; - Purpose: increment wins and add earnings

&nbsp; - Request JSON:

&nbsp;   { "wallet": "0x1234...", "amountWon": 25.5 }

&nbsp; - Success 200 -> updated user object

&nbsp; - Errors:

&nbsp;   404 { "error": "User not found" }

&nbsp;   500 { "error": "<error message>" }



\- POST /user/recordLoss

&nbsp; - Purpose: increment losses

&nbsp; - Request JSON:

&nbsp;   { "wallet": "0x1234..." }

&nbsp; - Success 200 -> updated user object

&nbsp; - Errors: same as recordWin



\- GET /user/:wallet

&nbsp; - Purpose: fetch user by wallet

&nbsp; - Example: GET /user/0x1234...

&nbsp; - Success 200 -> user object

&nbsp; - Errors:

&nbsp;   404 { "error": "User not found" }



Leaderboard routes (mounted at /leaderboard)

\- GET /leaderboard/earnings

&nbsp; - Purpose: list users sorted by earnings (DESC)

&nbsp; - Success 200 -> array of user objects:

&nbsp;   \[

&nbsp;     { "wallet":"0xA...", "username":"top1", "wins":10, "losses":2, "earnings":1200, "avatar":"<url>" },

&nbsp;     ...

&nbsp;   ]

&nbsp; - Error 500 { "error": "<error message>" }



\- GET /leaderboard/wins

&nbsp; - Purpose: list users sorted by wins (DESC)

&nbsp; - Success 200 -> same shape as earnings



\- GET /leaderboard/losses

&nbsp; - Purpose: list users sorted by losses (DESC)

&nbsp; - Success 200 -> same shape as earnings



\- GET /leaderboard/winrate

&nbsp; - Purpose: list users sorted by win rate (wins / (wins+losses), DESC)

&nbsp; - Success 200 -> array of objects:

&nbsp;   \[

&nbsp;     { "wallet":"0xA...", "username":"top1", "wins":10, "losses":2, "winrate":0.833, "earnings":1200 },

&nbsp;     ...

&nbsp;   ]

&nbsp; - Error 500 { "error": "<error message>" }





