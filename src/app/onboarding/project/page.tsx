'use client'
import { useRouter } from "next/navigation";

type Props = {}

const page = (props: Props) => {
  const router = useRouter();
  router.push('/onboarding/project/create-project');
}

export default page