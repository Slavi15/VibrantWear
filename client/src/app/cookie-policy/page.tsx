import dynamic from "next/dynamic";
const CookiePolicy = dynamic(() => import("@/components/docs/CookiePolicy.tsx"));

const Cookie = () => {
    return <CookiePolicy />;
}

export default Cookie;