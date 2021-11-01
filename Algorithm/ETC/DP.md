```jsx
const dp = [];

const fibonacci = (num) => {
  if (num <= 2) return 1;
  if (dp[num] !== undefined) return dp[num];
  return (dp[num] = fibonacci(num - 1) + fibonacci(num - 2));
};
```
