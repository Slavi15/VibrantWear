import dynamic from "next/dynamic";
const PrivacyPolicy = dynamic(() => import("@/components/docs/PrivacyPolicy"));

const Privacy = () => {
    return <PrivacyPolicy />
};

export default Privacy;