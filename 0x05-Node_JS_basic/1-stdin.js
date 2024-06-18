process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.on('data', (data) => {
  process.stdout.write(`Your name is: ${data.toString()}\n`);
});

process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
  process.exit(0);
});
