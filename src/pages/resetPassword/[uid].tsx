import Layout from '@/components/layout'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const invalid = (uid: string | string[] | undefined) => {
    return true;
}

export default function ResetPassword() {
    const router = useRouter()
    const uid = router.query.uid

    // Guard Clause for invalid uid
    if (invalid(uid)) {
        useEffect(() => {
            router.push('/404');
        }, [])
    }
    
    return (
        <>
            <Layout
            px={{ base: 5, md: 20 }}
            py={{ base: 5, md: 10 }}
            title={`Reset for ${uid}`}
            >
            </Layout>
        </>
    )
}