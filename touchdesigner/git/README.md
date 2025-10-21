# Bonnes pratiques *git* pour TouchDesigner

## Désactiver les sauvegardes supplémentaires

![](./td_preferences.png)

## .gitignore

```
# Ignore TouchDesigner backup files (with a number before .toe)
*.[0-9]*.toe
```