import { Spinner } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../auth/hook/useAxiosSecure';
import { Card, CardHeader, CardBody, Typography, Avatar } from "@material-tailwind/react";

const VisitorMessage = () => {

  const axiosSecure = useAxiosSecure();

  const { data: messages = {}, isLoading, refetch } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/contact`);
      return data;
    },
  });

  if (isLoading) return <div className="flex items-center justify-center my-28"> <Spinner /> </div>

  console.log(messages)

  return (
    <div className="">
      <div className="text-center py-4">
        <Typography variant="h2" color="blue-gray" className="font-montserrat">
          Visitor Messages
        </Typography>
      </div>
      <div className='grid lg:grid-cols-3 gap-5'>
        {messages.map(message => (
          <Card key={message._id} color="transparent" shadow={false} className="w-full max-w-[26rem] border px-4">
            <CardHeader
              color="transparent"
              floated={false}
              shadow={false}
              className="mx-0 flex items-center gap-4 pt-0 pb-8"
            >
              <Avatar
                size="lg"
                variant="circular"
                src={message.image || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"}
                alt={message.name}
              />
              <div className="flex w-full flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <Typography variant="h5" color="blue-gray"> {message.name} </Typography>
                </div>
                <Typography color="blue-gray">{message.email}</Typography>
              </div>
            </CardHeader>
            <CardBody className="mb-6 p-0">
              <Typography> {message.message} </Typography>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VisitorMessage;
