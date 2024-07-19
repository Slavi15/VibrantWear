import dynamic from "next/dynamic";
const TermsConditions = dynamic(() => import("@/components/docs/TermsConditions"));

const Terms = () => {
    return <TermsConditions />
};

export default Terms;