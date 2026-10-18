# Lokal mit Docker starten

Docker Desktop mit Linux-Containern starten. Im Repository-Root
(`C:\Development\tradinview\my-tradingview-clone` auf diesem Rechner):

```powershell
docker compose up --build -d --wait --wait-timeout 600
```

Die App ist anschließend unter http://localhost:3000 erreichbar. Ein zuvor
gestartetes lokales Frontend auf Port 3000 vorher mit Strg+C beenden.

Compose baut Frontend und Backend mit Node 22 und startet TimescaleDB/PostgreSQL.
Das Backend führt beim Start automatisch die Datenbankmigrationen aus. Die
Startreihenfolge wartet auf die Datenbank und anschließend auf das Backend
einschließlich aktuellem Datenbankschema.

Die `.env` neben `compose.yaml` enthält bereits zufällig erzeugte lokale
Geheimnisse. Sie bleibt außerhalb der Images. Authentifizierung ist im Backend
und im Frontend deaktiviert. Nur Port 3000 wird auf dem lokalen Rechner
veröffentlicht; Backend und Datenbank sind über das Compose-Netz erreichbar.

Nach einem frischen Clone einmal `node scripts/init-compose-env.cjs` ausführen
(Node 22+). Das erzeugt die lokale `.env` aus `.env.example` mit zufälligen
Geheimnissen und erhält vorhandene Werte. Anschließend genügt der Startbefehl oben.

Charting, Indikatoren und Backtesting laufen in diesem Stack. Marktdaten brauchen
Internetzugang. Der externe Scanner, Forschungs-Optimizer und ein Ausführungsbot
gehören zu separaten Diensten/Repositories und sind hier nicht eingerichtet.
Trading und Webhook-Versand sind für dieses lokale Setup deaktiviert; die
vorgeschriebene Webhook-Liste enthält `disabled.invalid`.

Die Datenbank liegt dauerhaft im Compose-Volume `database`. Sie ist getrennt von
der bisherigen Datenbank aus `platform/docker-compose.yml`.
Passwort und Verschlüsselungsschlüssel in `.env` bei weiteren Starts beibehalten.

```powershell
# Status
docker compose ps

# Logs
docker compose logs -f

# Stoppen (Daten bleiben erhalten)
docker compose down

# Nach dem ersten Build erneut starten
docker compose up -d --wait --wait-timeout 600
```
