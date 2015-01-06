# fs-auth

Auth beyond filesystem

## Demo

```
$ cat a.txt
> hello啊 world 你是大傻逼123 ahah

$ fa lock *.txt
password> (type one)
$ cat a.txt
> 77de54ccf56eb6f7dbf99e4d3be949ab9e˥ΟFʿ84ݧÓϖXóÔIúèKÚÚF³ëKåô9298i81Ûǟm

$ fa auth *.txt
password> (type randomly)
> [ [ 'a.txt', 'auth fail' ] ]

$ fa auth *.txt
password> (type correctly)
$ cat a.txt
> hello啊 world 你是大傻逼123 ahah
```

## CLI Usage

```
$ npm i -g fs-auth
```

```
$ fa lock *.txt
$ fa auth *.jpg
```

## API Usage

```
$ npm i fs-auth
```

```
var fa = require('fs-auth')
var encryptedBuf = fa.lock(originalBuf, pwd)
var _originalBuf = fs.auth(encryptedBuf, pwd)
```
