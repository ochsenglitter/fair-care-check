# Warum liegt Laufstart hier?

Dieser Ordner ist die fertige App **Laufstart** und gehört inhaltlich **nicht**
zu Fair Care Check. Er liegt hier nur zwischengeparkt: Das GitHub-Konto dieser
Sitzung darf keine neuen Repositories anlegen (HTTP 403), und ohne Zielrepo
wäre der Code beim Ende der Sitzung verloren gewesen.

## In ein eigenes Repository umziehen

1. Auf GitHub ein leeres Repository `laufstart` anlegen – ohne README, ohne
   .gitignore, ohne Lizenz.
2. Lokal:

       git clone https://github.com/ochsenglitter/fair-care-check.git zwischenschritt
       cd zwischenschritt
       git checkout claude/jogging-learning-app-2rzsuo
       cp -r laufstart ../laufstart
       cd ../laufstart
       rm HINWEIS.md
       git init -b main
       git add .
       git commit -m "Laufstart: Trainingsplan, Intervall-Timer, Fortschritt"
       git remote add origin https://github.com/ochsenglitter/laufstart.git
       git push -u origin main

3. Im neuen Repository unter *Settings › Pages* als Quelle Branch `main` und
   Ordner `/ (root)` wählen. Die App liegt danach unter
   `https://ochsenglitter.github.io/laufstart/`.
4. Diesen Ordner und den Branch `claude/jogging-learning-app-2rzsuo` in
   fair-care-check löschen.

Alternativ: Repository anlegen und in der Sitzung Bescheid geben – dann wird
der Code direkt dorthin gepusht.
