import { useSession, getSession } from "next-auth/react";
import { Input, Flex, Button, Text, Heading, InputRightElement, InputGroup, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, useDisclosure, VStack, Center, HStack, Select, Textarea, Card, CardBody, Image, Stack, Divider, CardFooter, ButtonGroup, Wrap, WrapItem, CardHeader, Avatar, Box, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { SearchIcon, StarIcon } from '@chakra-ui/icons'

// Define Prop Interface
interface ShowProps {
  user: any
  url: string
  courses: any
}

function Home(props: ShowProps) {
  const { data: session } = useSession();
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();

  const [valueTitle, setValueTitle] = useState("");
  const [valueDate, setValueDate] = useState("");
  const [valueDuration, setValueDuration] = useState("");
  const [valuePrice, setValuePrice] = useState();
  const [valueDescription, setValueDescription] = useState("");
  const [valuePillar, setValuePillar] = useState("Emotional");
  const [valuePlaces, setValuePlaces] = useState();

  const [searchField, setSearchField] = useState("");
  const [courses, setCourses] = useState(props.courses);
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [idCourseToDelete, setIdCourseToDelete] = useState("");

  const createCourse = async () => {
    const newCourse = [{
      userId: session?.user?.id,
      userImage: session?.user?.image,
      title: valueTitle,
      date: valueDate,
      duration: valueDuration,
      price: valuePrice,
      description: valueDescription,
      pillar: valuePillar,
      teacher: session?.user?.name,
      places: valuePlaces
    }]
    const res = await fetch(props.url + "courses/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCourse),
    })
    if (res.status === 200) {
      const res2 = await fetch(props.url + "courses/teacher/" + session?.user?.id, {
        method: "get",
      })
      const coursesUpdated = await res2.json();
      if (res2.status === 200) setCourses(coursesUpdated);
    }
  }

  const searchForCourses = (value: string) => {
    if (value === "")
      setCourses(props.courses);
    else {
      const result = props.courses.filter((x: { title: string; }) => x.title.toLowerCase().includes(value.toLowerCase()));
      setCourses(result);
    }
  }

  const deleteCourse = async (id: string) => {
    const res = await fetch(props.url + "courses/" + id, {
      method: "delete",
    })
    if (res.status === 200) {
      const result = props.courses.filter((x: { _id: string; }) => !x._id.toLowerCase().includes(id.toLowerCase()));
      setCourses(result);
    }
  }

  return (
    <Flex direction="column" alignItems="center" justifyContent="center">
      <Heading mt={10}>Courses</Heading>
      <Modal isOpen={isCreateOpen} onClose={onCreateClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new course</ModalHeader>
          <VStack alignItems='left' style={{ paddingInline: "40px" }}>
            <HStack>
              <Text width={100} text-align='left' fontSize={15}>Title</Text>
              <Input onChange={(e: any) => setValueTitle(e.target.value)} value={valueTitle} placeholder="Title" size="sm" />
            </HStack>
            <HStack>
              <Text width={100} text-align='left' fontSize={15}>Date</Text>
              <Input onChange={(e: any) => setValueDate(e.target.value)} value={valueDate} placeholder="Date and time" size="sm" type="datetime-local" />
            </HStack>
            <HStack>
              <Text width={100} text-align='left' fontSize={15}>Duration</Text>
              <Input onChange={(e: any) => setValueDuration(e.target.value)} value={valueDuration} placeholder="Duration" size="sm" type="time"></Input>
            </HStack>
            <HStack>
              <Text width={100} text-align='left' fontSize={15}>Price ($)</Text>
              <Input onChange={(e: any) => setValuePrice(e.target.value)} value={valuePrice} placeholder="Price" size="sm" type="number" />
            </HStack>
            <HStack>
              <Text width={100} text-align='left' fontSize={15}>Description</Text>
              <Textarea onChange={(e: any) => setValueDescription(e.target.value)} value={valueDescription} placeholder="Description" size="sm" />
            </HStack>
            <HStack>
              <Text width={100} text-align='left' fontSize={15}>Pillar</Text>
              <Select onChange={(e: any) => setValuePillar(e.target.value)} value={valuePillar} size="sm">
                <option>Emotional</option>
                <option>Physical</option>
                <option>Mental</option>
                <option>Spiritual</option>
                <option>Social</option>
                <option>Environmental</option>
                <option>Financial</option>
                <option>Occupational</option>
              </Select>
            </HStack>
            <HStack>
              <Text width={100} text-align='left' fontSize={15}>Places</Text>
              <Input onChange={(e: any) => setValuePlaces(e.target.value)} value={valuePlaces} placeholder="Places available" size="sm" type="number" />
            </HStack>
          </VStack>
          <ModalCloseButton />
          <ModalFooter>

            <Button colorScheme='teal' mr={4} onClick={() => { createCourse(); onCreateClose(); }}>
              Validate
            </Button>
            <Button variant='ghost' onClick={onCreateClose} >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <HStack mt={5}>
        <InputGroup size='md' width={500}>
          <Input
            pr='4.5rem'
            type='text'
            placeholder='Search for a course'
            value={searchField}
            style={{ border: "1px solid #D3D3D3" }}
            onChange={(e: any) => { setSearchField(e.target.value); searchForCourses(e.target.value) }}
          />
          <InputRightElement>
            <Button onClick={() => { searchForCourses(searchField) }} rightIcon={<SearchIcon />} variant='solid' colorScheme='blue' pl={2}></Button>
          </InputRightElement>
        </InputGroup>
        {props.user.status === "Teacher" && (<Button onClick={onCreateOpen} ml={10} colorScheme='teal' size='md'>Add course</Button>)}
      </HStack>

      <Wrap spacing='20px' justify='center' pt={5} pb={5}>{courses.map(
        (course: any, index: number) =>
          <WrapItem key={index}>
            <Card height={350} width={350} style={{ border: "1px solid #D3D3D3" }}>
              <CardHeader>
                <Flex>
                  <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Avatar name={course.teacher} src={course.userImage} />
                    <Box>
                      <Heading size='sm'>{course.teacher}</Heading>
                      <Text>{course.title}</Text>
                    </Box>
                  </Flex>
                  <IconButton
                    variant='ghost'
                    colorScheme='gray'
                    aria-label='See menu'
                    icon={<StarIcon style={{ color: "grey" }} />}
                  />
                </Flex>
              </CardHeader>
              <CardBody >
                <Stack spacing='1'>
                  <Text>
                    {course.description}
                  </Text>
                  <Text fontSize={12}>
                    Date : {course.date} - Duration : {course.duration}
                  </Text>
                  <Text fontSize={12}>
                    {course.places} places available
                  </Text>
                  <Text fontSize={12}>
                    PILLAR : {course.pillar}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <Flex style={{ width: "100%" }} justifyContent={"space-between"}>
                  {props.user.status === "Teacher" && (<ButtonGroup spacing=''>
                    <Button variant='solid' colorScheme='blue'>
                      Edit
                    </Button>
                    <Button variant='ghost' colorScheme='red' onClick={() => { setIdCourseToDelete(course._id); onDeleteOpen() }}>
                      Delete
                    </Button>
                  </ButtonGroup>)}
                  {props.user.status === "Student" && (<ButtonGroup spacing=''>
                    <Button variant='solid' colorScheme='blue'>
                      Join
                    </Button>
                  </ButtonGroup>)}
                  <Text color='black' fontSize='20' style={{ border: "1px solid black", borderRadius: "10px", padding: "5px 15px" }}>
                    ${course.price}
                  </Text>
                </Flex>
              </CardFooter>
            </Card>
          </WrapItem>)}
      </Wrap>
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete this course ?</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme='teal' mr={4} onClick={() => { deleteCourse(idCourseToDelete); onDeleteClose(); }}>
              Yes
            </Button>
            <Button variant='ghost' onClick={onDeleteClose} >
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Home;


export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (session?.user) {
    const resultUsers = await fetch(process.env.API_URL + "users/" + session?.user?.id);
    const user = await resultUsers.json();
    if (!user.filledForm) {
      return {
        redirect: {
          permanent: false,
          destination: "/form",
        },
        props: {},
      }
    }
    else {
      if (user.status === "Teacher") {
        const resultCourses = await fetch(process.env.API_URL + "courses/teacher/" + session?.user?.id, {
          method: "get",
        });
        const courses = await resultCourses.json();
        return {
          props: {
            user: user,
            url: process.env.API_URL,
            courses: courses,
          }
        }
      }
      else{
        const resultCourses = await fetch(process.env.API_URL + "courses/student/" + session?.user?.id, {
          method: "get",
        });
        const courses = await resultCourses.json();
        return {
          props: {
            user: user,
            url: process.env.API_URL,
            courses: courses,
          }
        }
      }

    }
  }

  return {
    redirect: {
      permanent: false,
      destination: "/auth",
    },
    props: {},
  }
}