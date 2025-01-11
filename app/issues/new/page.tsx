"use client";
import { validateForm } from '@/app/validateForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Callout, Flex, Text, TextArea, TextField } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';



// type issueForm = {
//   issue_title: string;
//   issue_desc: string;
// }
type issueForm = z.infer<typeof validateForm>

export default function CreatedIssue() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<issueForm>(
    {
      resolver: zodResolver(validateForm)
    }
  )

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
  // console.log(errors);





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
            {errors.issue_title ? <Text color='red' as='p'>{errors.issue_title.message}</Text> : ""}
          </Box>
          <Box maxWidth="400px">
            <TextArea placeholder="Description" {...register("issue_desc")} />
            {errors.issue_desc ? <Text color='red' as='p'>{errors.issue_desc.message}</Text> : ""}
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