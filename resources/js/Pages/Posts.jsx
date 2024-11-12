import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";

export default function Posts({ auth }) {
    return (
        <>
            <Head title="Posts" />
            <Layout auth={auth}></Layout>
            <div>{JSON.stringify(auth.user)}</div>
        </>
    );
}
