import { useSession, getSession } from "next-auth/react";
import { Input, Flex, Button, Text, Heading, InputRightElement, InputGroup, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, useDisclosure, VStack, Center, HStack, Select, Textarea, Card, CardBody, Image, Stack, Divider, CardFooter, ButtonGroup, Wrap, WrapItem, CardHeader, Avatar, Box, IconButton, list } from "@chakra-ui/react";
import { useState } from "react";
import { SearchIcon, StarIcon, SettingsIcon, TimeIcon, CalendarIcon } from '@chakra-ui/icons'
import { IoPeopleOutline } from "react-icons/io5";

// Define Prop Interface
interface ShowProps {
  user: any
  url: string
  courses: any
  coursesJoined: any
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
  const [coursesForSearch, setCoursesForSearch] = useState(props.courses);
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [idCourseToDelete, setIdCourseToDelete] = useState("");

  const [coursesJoined, setCoursesJoined] = useState(props.coursesJoined);
  const [myCoursesSection, setMyCoursesSection] = useState(false);

  const [editCourseMode, setEditCourseMode] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState();

  const updateCourse = async () => {
    const newCourse = [{
      ...courseToEdit,
      teacherId: session?.user?.id,
      teacherImage: session?.user?.image,
      teacherName: session?.user?.name,
      title: valueTitle,
      date: valueDate,
      duration: valueDuration,
      price: valuePrice,
      description: valueDescription,
      pillar: valuePillar,
      places: valuePlaces,
    }]
    const res = await fetch(props.url + "courses/" + courseToEdit._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCourse),
    })
    const result = await res.json();
    if (res.status === 200) {
      for (let x = 0; x < courses.length; x++) {
        if (courses[x]._id === courseToEdit._id)
          delete courses[x];
      }
      const newCourse = [].concat(courses, result);
      setCourses(newCourse);
      setCoursesForSearch(newCourse);
    }
  }
   
  const fillEditForm = (course: any) => {
    setValueTitle(course.title);
    setValueDate(course.date);
    setValueDuration(course.duration);
    setValuePrice(course.price);
    setValueDescription(course.description);
    setValuePillar(course.pillar);
    setValuePlaces(course.places);
    setCourseToEdit(course);
    setEditCourseMode(true);
  }

  const createCourse = async () => {
    const newCourse = [{
      teacherId: session?.user?.id,
      teacherImage: session?.user?.image,
      teacherName: session?.user?.name,
      title: valueTitle,
      date: valueDate,
      duration: valueDuration,
      price: valuePrice,
      description: valueDescription,
      pillar: valuePillar,
      places: valuePlaces,
      participants: 0,
    }]
    const res = await fetch(props.url + "courses/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCourse),
    })
    const result = await res.json();
    if (res.status === 200) {
      const newCourse = [].concat(courses, result);
      setCourses(newCourse);
      setCoursesForSearch(newCourse);
    }
  }

  const searchForCourses = (value: string) => {
    if (value === "")
      setCourses(coursesForSearch);
    else {
      const result = coursesForSearch.filter((
        x: { title: string; teacherName: string; description: string; pillar: string }) =>
        x.title.toLowerCase().includes(value.toLowerCase())
        || x.teacherName.toLowerCase().includes(value.toLowerCase())
        || x.description.toLowerCase().includes(value.toLowerCase())
        || x.pillar.toLowerCase().includes(value.toLowerCase())
      );
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

  const joinCourse = async (course: any) => {
    const joinCourse = [{
      studentId: session?.user?.id,
      courseId: course._id,
    }]
    const res = await fetch(props.url + "joincourses/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(joinCourse),
    })
    if (res.status === 200) {
      const OneMorePeopleInCourse = { ...course, participants: course.participants + 1 }
      const res3 = await fetch(props.url + "courses/" + course._id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(OneMorePeopleInCourse),
      })
      const coursesUpdated = await res3.json();
      for (let x = 0; x < courses.length; x++) {
        if (courses[x]._id === course._id)
          delete courses[x];
      }
      const newCourse = [].concat(courses, coursesUpdated);
      setCourses(newCourse.flat());
      const newCoursesJoined = [].concat(coursesJoined, coursesUpdated);
      setCoursesJoined(newCoursesJoined.flat());
    }
  }

  const leaveCourse = async (course: any) => {
    const res = await fetch(props.url + "joincourses/" + course._id, {
      method: "delete",
    })
    if (res.status === 200) {
      const OneLessPeopleInCourse = { ...course, participants: course.participants - 1 }
      console.log(OneLessPeopleInCourse);
      const res3 = await fetch(props.url + "courses/" + course._id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(OneLessPeopleInCourse),
      })
      const coursesUpdated = await res3.json();
      for (let x = 0; x < courses.length; x++) {
        if (courses[x]._id === course._id)
          delete courses[x];
      }
      for (let x = 0; x < coursesJoined.length; x++) {
        if (coursesJoined[x]._id === course._id)
          delete coursesJoined[x];
      }
      const newCourse = [].concat(courses, coursesUpdated);
      setCourses(newCourse.flat());
      setCoursesJoined(coursesJoined);
    }
  }

  return (
    <Flex direction="column" alignItems="center" justifyContent="center">
      {props.user.status === "Teacher" && (<Heading mt={10}>My Courses</Heading>)}
      {props.user.status === "Student" && (<HStack mt={10} spacing={20}>
        <Heading
          color={myCoursesSection ? 'grey' : 'teal'}
          _hover={{ cursor: 'pointer' }}
          onClick={() => { setMyCoursesSection(false) }}
        >
          Join Courses
        </Heading>
        <Heading
          color={myCoursesSection ? 'teal' : 'grey'}
          _hover={{ cursor: 'pointer' }}
          onClick={() => { setMyCoursesSection(true) }}
        >
          My Courses
        </Heading>
      </HStack>)}
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

            <Button colorScheme='teal' mr={4} onClick={() => { 
              if(editCourseMode) updateCourse(); 
              else{createCourse();}
              onCreateClose(); 
              }}>
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
        <Button onClick={undefined} rightIcon={<SettingsIcon />} variant='solid' colorScheme='blue' pl={2}></Button>
        {props.user.status === "Teacher" && (<Button onClick={onCreateOpen} ml={10} colorScheme='teal' size='md'>Add course</Button>)}
      </HStack>
      <Wrap
        spacing='20px'
        justify='center'
        pt={5}
        pb={5}
      >{(props.user.status === 'Teacher' ? courses : myCoursesSection ? coursesJoined : courses).map(
        (course: any, index: number) =>
          <WrapItem key={index}>
            <Card height={350} width={350} style={{ border: "1px solid #D3D3D3" }}>
              <CardHeader>
                <Flex>
                  <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Avatar name={course.teacherName} src={course.teacherImage} />
                    <Box>
                      <Heading size='sm'>{course.teacherName}</Heading>
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
              <CardBody mt={-10}>
                <Stack spacing='5' p={4} >
                  <Text>
                    {course.description}
                  </Text>
                  <VStack>
                    <HStack>
                      <CalendarIcon color='teal'/>
                      <Text fontSize={12}>
                        {course.date}
                      </Text>
                    </HStack>
                    <HStack>
                      <TimeIcon color='teal'/>
                      <Text fontSize={12}>
                        {course.duration}
                      </Text>
                    </HStack>
                    <HStack>
                      <IoPeopleOutline color='teal'/>
                      <Text fontSize={12}>
                        {course.participants} / {course.places}
                      </Text>
                    </HStack>
                    <HStack>
                      
                      <Text fontSize={12}>
                        PILLAR : {course.pillar}
                      </Text>
                    </HStack>
                  </VStack>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <Flex style={{ width: "100%" }} justifyContent={"space-between"}>
                  {props.user.status === "Teacher" && (<ButtonGroup spacing=''>
                    <Button onClick={() => {fillEditForm(course); onCreateOpen()}} variant='solid' colorScheme='blue'>
                      Edit
                    </Button>
                    <Button variant='ghost' colorScheme='red' onClick={() => { setIdCourseToDelete(course._id); onDeleteOpen() }}>
                      Delete
                    </Button>
                  </ButtonGroup>)}
                  {props.user.status === "Student" && (<ButtonGroup spacing=''>
                    {!myCoursesSection && (<Button variant='solid' colorScheme='blue' onClick={() => { joinCourse(course) }}>
                      Join
                    </Button>)}
                    {myCoursesSection && (<Button variant='solid' colorScheme='red' onClick={() => { leaveCourse(course) }}>
                      Leave
                    </Button>)}
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
      else {
        const resultCourses = await fetch(process.env.API_URL + "courses", {
          method: "get",
        });
        const courses = await resultCourses.json();
        const resultCoursesJoined = await fetch(process.env.API_URL + "joincourses/student/" + session?.user?.id, {
          method: "get",
        });
        const listCoursesJoined = await resultCoursesJoined.json();
        let coursesJoined: string[] = [];
        for(let x=0; x < listCoursesJoined.length; x++){
          const res = await fetch(process.env.API_URL + "courses/" + listCoursesJoined[x].courseId, {
            method: "get",
          });
          const result = await res.json();
          coursesJoined.push(result);
        }
        return {
          props: {
            user: user,
            url: process.env.API_URL,
            courses: courses,
            coursesJoined: coursesJoined,
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