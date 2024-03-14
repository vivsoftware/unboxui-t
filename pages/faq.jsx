import React from "react";
import { MDBAccordion, MDBAccordionItem, MDBContainer } from "mdb-react-ui-kit";
import Layout4 from "../Layout/Layout4";
import Head from "next/head";
import Enquire from "./layout/Enquire";
import FlowerSubscribe from "../Components/FlowerDemo/FlowerSubscribe";
import BreadCrumb from "../Components/Element/BreadCrumb";

const FAQ = () => {
  return (
    <Layout4 className="home-page">
      <Head>
        <title>FAQ - Unbox Industry</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="FAQ" />
        <meta name="description" content="Here you can gain and enhance your implementing Automation decision and resolve your general queries to move on with Automation implementation"/>
        <meta name="keywords" content="Robots and Cobots,how cobot works,how to handle industrial cameras, applications of robots, where to use industrial camera "/>
        <link rel="icon" href="/Box.ico" alt="unboxLogo"/>
        <link rel="canonical" href="https://www.unboxindustry.com/faq" />
      </Head>
      <BreadCrumb parent={''} title={''} />
      <div className="container mt-3">
      <h1 className='text-center mt-1 mb-2' style={{fontSize:'30px'}}>FAQs</h1>
        <div className="row">
          <p className="text-center">
            Here you can gain and enhance your implementing Automation decision
            and resolve your general queries to move on with Automation
            implementation and grow awareness of it. This QA Section will help
            you learn and know more about your doubts & queries.
            <br />
            <br />
            Don’t find your answer here?{" "}
            <a style={{ color: "#FF8400" }}>Contact us</a>
          </p>
        </div>
      </div>
      <div>
        <MDBContainer className="mt-5" style={{ maxWidth: "1000px" }}>
          <h3 className="mb-3 fw-bold" style={{ fontSize: "25px" }}>
            Site and Purchasing a Robot
          </h3>
          <MDBAccordion alwaysOpen initialActive={1}>
            <MDBAccordionItem
              collapseId={1}
              headerTitle="Are these the actual prices?"
            >
              These are the real prices, yes! However, they do not include
              shipping, handling, or relevant taxes. If you’d like to get a
              concrete offer with an exact price including the above, don’t
              hesitate to<a style={{ color: "#FF8400" }}> contact us here.</a>
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={2}
              headerTitle="Do the prices include tax?"
            >
              No, the listed prices do not include taxes that may be applicable
              to the sale (Value-Added Tax and/or Sales Tax). You can{" "}
              <a style={{ color: "#FF8400" }}>contact us</a> to get a total cost
              estimate.
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={3}
              headerTitle="I found the robot I want; how do I buy it?"
            >
              We’re glad you found your next robot coworker! The next step is to
              send us a message or call us so that we can finalize the order and
              get the robot on its way.
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={4}
              headerTitle="What is the process of using the configurator?"
            >
              The configurator on our website allows you to find the right
              solution for your use case. With the configurator, describe your
              use case and the cobot, gripper, and vision tool will be
              recommended that best matches your needs. You can try out new
              ideas easily with it, as it’s fast, easy to use, and great for
              just playing around.
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={5}
              headerTitle="How long does shipping take?"
            >
              Shipping depends principally on your location and the robot in
              question, but once the order is finalized, the wait should be
              around a week or two.
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={6}
              headerTitle="Will you install the robot for me?"
            >
              Yes, at client request, we’d be more than happy to install and
              integrate your robot for you. When ordering you robot, mention
              this and we can give you a cost and time estimate.
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={7}
              headerTitle="How long does it take to finalize the purchase?"
            >
              Once you decide that this robot is for you, finalizing the
              purchase can take as little as one working day.
            </MDBAccordionItem>
          </MDBAccordion>
        </MDBContainer>
      </div>
      {/* Robots and Cobots */}
      <div>
        <MDBContainer className="mt-5" style={{ maxWidth: "1000px" }}>
          <h3 className="mb-3 fw-bold" style={{ fontSize: "25px" }}>
            Robots and Cobots
          </h3>
          <MDBAccordion alwaysOpen initialActive={1}>
            <MDBAccordionItem collapseId={1} headerTitle="What is a cobot?">
              A cobot, or collaborative robot, is a robot that is designed to
              work with and around people – that is to say in collaboration with
              them. This collaboration is made possible by a number of safety
              features such as torque sensors in various joints that allows the
              robots to quickly realize that it has bumped into something.
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={2}
              headerTitle="What is the difference between a cobot and a standard industrial robot?"
            >
              The principal difference between a cobot and a traditional
              industrial robot is that the cobot can often work in direct
              collaboration with people. Industrial robots usually need to work
              behind cages or in other enclosures, with cobots this is not the
              case.
              <br />
              <br />
              Cobots are safer, require less space to install, and can be more
              easily reprogrammed for new tasks. The downside, however, is that
              they are slower, less accurate, and tend to have a low maximum
              payload when compared to their industrial siblings.
            </MDBAccordionItem>
            <MDBAccordionItem collapseId={3} headerTitle="Are cobots safer?">
              An industrial robot, when properly used, is safe. However, it is
              safe because it is separated from people. A cobot, on the other
              hand, is much safer to be around because between a slower linear
              speed and torque sensors, it can usually stop quite quickly when
              it hits something or someone that shouldn’t be there.
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={4}
              headerTitle="Are cobots easier to use?"
            >
              As a rule, cobots are easier to use. They are designed to be easy
              to program, reprogram, move, and repurpose. Many simple to
              intermediate processes can be programed with graphical training
              tools by operators with comparatively little training.
              <br />
              <br /> Training is often a matter of days.
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={5}
              headerTitle="Are cobots more expensive than standard industrial robots?"
            >
              Because they can operate in proximity to people and are
              comparatively easy to program and use, cobots are generally more
              expensive than an industrial robot with the same payload/reach.
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={6}
              headerTitle="Will a cobot work for my application?"
            >
              If the task fits within the reach/payload parameters of the cobot
              in question, then the answer is almost certainly yes! However,
              we’d be happy to talk to you about your use case.
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={7}
              headerTitle="How do I know which robot is for me?"
            >
              Finding the right robot can be difficult. However, an easy place
              to start is with our configurator tool. This tool will take
              information about your use case and give you a robot that fits the
              task. However, if you’re still not sure which robot is for you or
              for your use case, we’d be happy to help you find one.
            </MDBAccordionItem>
          </MDBAccordion>
        </MDBContainer>
      </div>
      {/* Gripper */}
      <div>
        <MDBContainer className="mt-5" style={{ maxWidth: "1000px" }}>
          <h3 className="mb-3 fw-bold" style={{ fontSize: "25px" }}>
            Gripper
          </h3>
          <MDBAccordion alwaysOpen initialActive={1}>
            <MDBAccordionItem
              collapseId={1}
              headerTitle="Which grippers are compatible with my robot?"
            >
              Most major gripper manufacturers build gripper adapters for most
              major robot manufacturers, at least when it comes to cobots. Many
              are out of the box compatible with the most common robot brands.
              If you are concerned about whether or not a given gripper will be
              easily fitted to your robot, let us know and we can get back to
              you with an answer.
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={2}
              headerTitle="Can I use multiple grippers with on robot?"
            >
              Yes, there are systems that allow the robot to change out its
              gripper for another automatically, as well as solutions where two
              grippers are placed on one robot arm.
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={3}
              headerTitle="Are grippers interchangeable? "
            >
              With tool changing systems, one gripper can be easily changed out
              for another.
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={4}
              headerTitle="How long will a single gripper last?"
            >
              When used properly, grippers should last as long as the robot.
              Parts that come into contact with the manipulated objects may need
              to be replaced or adjusted over time, however.
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={5}
              headerTitle="Which gripper is best for my use case?"
            >
              Which gripper you need depends largely on your use case. A good
              place to start would be with our configurator tool. This tool will
              take information about your use case and give you a gripper that
              fits the task. If you still aren’t sure which one fits your
              specific use case, get in touch and we’d be happy to advise you.
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={6}
              headerTitle="What are the safety implications of a gripper?"
            >
              Most grippers designed to work with cobots are quite safe. Some
              grippers, such as those with sharp edges or cutting tools, will
              require you to rework your risk assessment.
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={7}
              headerTitle="Can I get a customized gripper?"
            >
              Some use cases simply require a custom solution. This is something
              that we can help you with, email, text, or call us!
            </MDBAccordionItem>
          </MDBAccordion>
        </MDBContainer>
      </div>
      {/* Camera */}
      <div>
        <MDBContainer className="mt-5 mb-5" style={{ maxWidth: "1000px" }}>
          <h3 className="mb-3 fw-bold" style={{ fontSize: "25px" }}>
            Camera
          </h3>
          <MDBAccordion alwaysOpen initialActive={1}>
            <MDBAccordionItem
              collapseId={1}
              headerTitle="Do I need a camera in my robotics application (why can I benefit from the camera)?"
            >
              Adding flexibility to the process especially with low volume, High
              mix process. No need to change the construction when a new product
              is produced.
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={2}
              headerTitle="Are the cameras able to handle quality assurance tasks?"
            >
              Ranging from visual inspection to 3D quality inspection, the right
              camera with the right software will always help.
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={3}
              headerTitle="What is the benefit of a 3D Camera in my robotics application?"
            >
              In tasks with high objects variability, a 3D camera can have a
              better understanding of the objects and can lead the robot to
              perform the task by finding the accurate position of the objects
              and its surrounding.
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={4}
              headerTitle="Will a 2D camera be sufficient for my application?"
            >
              For quality assurance as well for object detection tasks a
              suitable 2D camera will perform the task.
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={5}
              headerTitle="Are camera-based Barcode reader reliable?"
            >
              A camera-based Barcodes reader adds more flexibility to your
              process, as it can reads barcodes with different sizes and
              different orientation without reconfigure your system/process (a
              camera-based barcode reader does not require that the barcode
              should always be at the exact 100% same position choosing the
              right Hardware has a key role in the reliability of your vision
              system).
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={6}
              headerTitle="Are all kinds of 3D cameras suitable for my application?"
            >
              3D cameras have different technologies and choosing the right one
              for your application is the most important step while designing
              your system. Therefore talk to our expert to get a bit of help.
            </MDBAccordionItem>
            <MDBAccordionItem
              collapseId={7}
              headerTitle="Can a camera handle very small object ~1 mm?"
            >
              Yes, however, choosing the right hardware/ system design is key
              here
            </MDBAccordionItem>
          </MDBAccordion>
        </MDBContainer>
      </div>
      <Enquire />
      <FlowerSubscribe />
    </Layout4>
  );
};

export default FAQ;
