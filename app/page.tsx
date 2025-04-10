import Image from "next/image";
import Pagination from "./Pagination";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import { prisma } from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";




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
    <Grid columns={{initial: "1", md:"2"}} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={openCount} inProgress={inProgressCount} closed={closedCount}/>
        <IssueChart open={openCount} inProgress={inProgressCount} closed={closedCount}/>
      </Flex>
      <LatestIssues/>
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issue",
}
