GOL rules:

    Any live cell with fewer than two live neighbours dies, as if caused by under-population.
    Any live cell with two or three live neighbours lives on to the next generation.
    Any live cell with more than three live neighbours dies, as if by over-population.
    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.


```
a[0][0]  a[0][1]  a[0][2]  a[0][3]  a[0][4]  a[0][5]

a[1][0]  a[1][1]  a[1][2]  a[1][3]  a[1][4]  a[1][5]

a[2][0]  a[2][1]  a[2][2]  a[2][3]  a[2][4]  a[2][5]

a[3][0]  a[3][1]  a[3][2]  a[3][3]  a[3][4]  a[3][5]

a[4][0]  a[4][1]  a[4][2]  a[4][3]  a[4][4]  a[4][5]
```

 i  j
[2, 3]
north = i - 1
south = i + 1
east  = j + 1
west  = j - 1

if negative(n)
  n = a.length - n

getLocation
count alive neighbours
return status
