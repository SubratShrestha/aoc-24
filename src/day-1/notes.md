actual implementation was okay

used some shell to parse the input:
```sh
cat input.txt | cut -d' ' -f1
cat input.txt | cut -d' ' -f4
```

shove those arrays in the .ts file but used a vim macro to insert the commas:
```vim
qq
A,<esc>j
q
1000@q
```

