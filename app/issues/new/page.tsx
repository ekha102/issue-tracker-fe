"use client";
import { Box, Button, Callout, Flex, TextArea, TextField } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';



type issueForm = {
  issue_title: string;
  issue_desc: string;
}

export default function CreatedIssue() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<issueForm>()

  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (values: issueForm) => {
    // console.log(values);
    try {
      await axios.post("/api/issues", values);
      router.push("/issues");
    } catch (error) {
      setError("An unexpected error occurred.");
    }

  }
  console.log(error);





  return (
    <div>
      <h5 className="my-4">Create Issue Page</h5>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" gap="3">
          <Box maxWidth="400px">
            {error ?
              <Callout.Root color="red">
                <Callout.Text>
                  {error}
                </Callout.Text>
              </Callout.Root>
              : false}

          </Box>
          <Box maxWidth="400px">
            <TextField.Root placeholder="Title" {...register("issue_title")} />
          </Box>
          <Box maxWidth="400px">
            <TextArea placeholder="Description" {...register("issue_desc")} />
          </Box>
          <Box>
            <Button>Submit</Button>
          </Box>
        </Flex>
      </form>
    </div>
  )
}

// export default CreatedIssue 