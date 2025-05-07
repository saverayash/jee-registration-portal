import java.io.*;
import java.util.*;

public class Main {
    private static final FastIO sc = new FastIO();
    static StringBuffer str=new StringBuffer();
    public static void main(String[] args) {
       int t=sc.nextInt();
      
        while (t-- > 0) {
           solve();
        }
        System.out.println(str);
    }


    
    public static void solve() {
      int n=sc.nextInt();
      int k=sc.nextInt();
      long [] a=new long [n];
      int i=0,c=0;
      long mn=Integer.MAX_VALUE,s=0L,mx=0L;
      for(i=0;i<n;i++)
      {
       a[i]=sc.nextLong();
       mx=Math.max(mx,a[i]);
       mn=Math.min(mn,a[i]);
       s+=a[i];
      }
      for(i=0;i<n;i++)
      {
        if(a[i]==mx)
        c++;
      }
      if(mx-mn-1>k)
      str.append("Jerry\n");
      else if(mx-mn-1==k && c>1)
      str.append("Jerry\n");
      else if(s%2==1)
      str.append("Tom\n");
      else
      str.append("Jerry\n");
     
    }
    
    
    static class Pair
    {
        int x;
        int y;
        Pair(int x,int y)
        {
            this.x=x;
            this.y=y;
        }
        @Override
        public boolean equals(Object o) {
            // Check if the object is of the same type
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Pair pair = (Pair) o;
            return (x == pair.x && y == pair.y) || (x == pair.y && y == pair.x);  // Ensure pairs are equal regardless of order
        }
    
        @Override
        public int hashCode() {
            return Objects.hash(Math.min(x, y), Math.max(x, y));  // Generate hash code based on ordered pair values
        }
    }
   
    static long modInverse(long x, long m) {
        return power(x, m - 2, m);  
    }
    static long power(long x, long y, long m) {
        long res = 1;
        x = x % m;
        while (y > 0) {
            if ((y & 1) == 1) {
                res = (res * x) % m;
            }
            y = y >> 1;
            x = (x * x) % m;
        }
        return res;
    }
        

    static class FastIO {
        BufferedReader br;
        StringTokenizer st;

        FastIO() {
            br = new BufferedReader(new InputStreamReader(System.in));
        }

        String next() {
            while (st == null || !st.hasMoreTokens()) {
                try {
                    st = new StringTokenizer(br.readLine());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return st.nextToken();
        }

        int nextInt() {
            return Integer.parseInt(next());
        }

        long nextLong() {
            return Long.parseLong(next());
        }
    }
}