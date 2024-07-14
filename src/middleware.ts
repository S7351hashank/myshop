import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { getToken } from 'next-auth/jwt';
// import { parse } from 'cookie';
 
// This function can be marked `async` if using `await` inside
// const getInitialToken = (): string | null => {
  
//   if (typeof window !== "undefined" && window.localStorage) {
//       return localStorage.getItem("token");
//   }
//   return null;
// };

// const protectedRoutes = ['/products', '/addProductOne', '/addProductMore',];
export const middleware = async(req: NextRequest)=> {
  // console.log("middleware");
  
  const path = req.nextUrl.pathname
  // const {token} = useSelector((state:RootState)=>state.auth);

  const ispublicpath = (path ==='/signin' || path ==='/signup' || path ==='/forgotPassword' || path ==='/verifyemail' )

  const token = await req.cookies.get('token')?.value ?? false;

  if(!ispublicpath && !token){
    // console.log('Redirecting to /signin');
    return NextResponse.redirect(new URL('/signin', req.url));
  }
  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/products', '/addProductOne', '/addProductMore'
  ],
}