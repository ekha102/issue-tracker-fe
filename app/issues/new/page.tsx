import { Box, Button, Flex, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const CreatedIssue = () => {
  return (
    <div>
      <h5 className="my-4">Create Issue Page</h5>
      <Flex direction="column" gap="3">
        <Box maxWidth="400px">
          <TextField.Root placeholder="Title" />
        </Box>
        <Box maxWidth="400px">
          <TextArea placeholder="Description" />
        </Box>
        <Box>
          <Button>Submit</Button>
        </Box>
      </Flex>
    </div>
  )
}

export default CreatedIssue