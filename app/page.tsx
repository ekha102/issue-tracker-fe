import Image from "next/image";
import Pagination from "./Pagination";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import { prisma } from "@/prisma/client";




export default async function Home() {
  const openCount = await prisma.issue.count({
    where: {issue_status:"OPEN"}
  });

  const inProgressCount = await prisma.issue.count({
    where: {issue_status:"IN_PROGRESS"}
  });

  const closedCount = await prisma.issue.count({
    where: {issue_status:"CLOSED"}
  });
  return (
    <>
      {/* <LatestIssues/> */}
      <IssueSummary open={openCount} inProgress={inProgressCount} closed={closedCount}/>
    </>
  );
}
