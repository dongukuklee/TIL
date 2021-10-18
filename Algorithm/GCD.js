//Euclid method
const GCD = (m, n) => {
  if (n == 0) return m;
  return m > n ? calc_gcd(n, m % n) : calc_gcd(m, n % m);
};
