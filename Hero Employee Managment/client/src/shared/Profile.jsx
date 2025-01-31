import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

function Profile({employeeData}) {

  const { bank_account_no, designation, email, image, isVerified, name, role, salary } = employeeData || {};

  console.log(employeeData)
  return (
    <section className="container mx-auto px-8 py-10">
      <Card
        shadow={false}
        className="border border-gray-300 rounded-2xl"
      >
        <CardHeader shadow={false} className="h-60 bg-white border flex items-center justify-center border-gray-300 !rounded-lg">
          {/* <img 
            src={image}
            alt="dark"
            height={1024}
            width={1024}
            className="w-full h-full object-center"
          /> */}
          <Typography color="blue-gray" variant="h3">
            Welcome to {name}'s details! 
          </Typography>
        </CardHeader>
        <CardBody>
          <div className="flex lg:gap-0 gap-6 flex-wrap justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar src={image} alt="avatar" variant="rounded" />
              <div>
                <Typography color="blue-gray" variant="h6">
                  {name}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-gray-600"
                >
                  {email}
                </Typography>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outlined"
                className="border-gray-300 flex items-center gap-2"
              >
                {designation}
              </Button>
            </div>
          </div>
          <Typography
            variant="small"
            className="font-normal text-gray-600 mt-6"
          >
            Passionate UI/UX designer focused on creating intuitive and engaging
            digital experiences. <br /> Driven by design thinking, creativity,
            and a love for problem-solving.
          </Typography>
        </CardBody>
      </Card>
    </section>
  );
}

export default Profile;