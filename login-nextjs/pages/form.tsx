import { Heading, Text, Center, VStack, HStack, RadioGroup, Radio, Button, FormControl, FormLabel, Input, Select, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Box } from "@chakra-ui/react";
import { useSession, getSession } from "next-auth/react";
import Router from "next/router";
import { useState } from "react";

// Define Prop Interface
interface ShowProps {
    user: any
    url: string
}

function form(props: ShowProps) {
    const { data: session } = useSession();

    const [qstUniversity, setQstUniversity] = useState('');
    const handleChangeUniversity = (event: any) => setQstUniversity(event.target.value);
    const [qstYear, setQstYear] = useState('');
    const handleChangeYear = (event: any) => setQstYear(event.target.value);
    const [qstSport, setQstSport] = useState('');
    const handleChangeSport = (event: any) => setQstSport(event.target.value);
    const [qstSex, setQstSex] = useState('');
    const handleChangeSex = (event: any) => setQstSex(event.target.value);
    const [qstIdol, setQstIdol] = useState('');
    const handleChangeIdol = (event: any) => setQstIdol(event.target.value);

    const [qstEmotion1, setQstEmotion1] = useState('Not at all');
    const handleChangeEmotion1 = (event: any) => setQstEmotion1(event.target.value);
    const [qstEmotion2, setQstEmotion2] = useState('Not at all');
    const handleChangeEmotion2 = (event: any) => setQstEmotion2(event.target.value);
    const [qstEmotion3, setQstEmotion3] = useState(1);
    const [qstPhysical1, setQstPhysical1] = useState('Not at all');
    const handleChangePhysical1 = (event: any) => setQstPhysical1(event.target.value);
    const [qstPhysical2, setQstPhysical2] = useState('Yes');
    const [qstPhysical3, setQstPhysical3] = useState('Nutrition');
    const handleChangePhysical3 = (event: any) => setQstPhysical3(event.target.value);
    const [qstMental1, setQstMental1] = useState('Not at all');
    const handleChangeMental1 = (event: any) => setQstMental1(event.target.value);
    const [qstMental2, setQstMental2] = useState('Yes');
    const [qstSpiritual1, setQstSpiritual1] = useState('Not at all');
    const handleChangeSpiritual1 = (event: any) => setQstSpiritual1(event.target.value);
    const [qstSpiritual2, setQstSpiritual2] = useState('Yes');
    const [qstSocial1, setQstSocial1] = useState('Not at all');
    const handleChangeSocial1 = (event: any) => setQstSocial1(event.target.value);
    const [qstSocial2, setQstSocial2] = useState('Not at all');
    const handleChangeSocial2 = (event: any) => setQstSocial2(event.target.value);
    const [qstSocial3, setQstSocial3] = useState('Yes');
    const [qstEnvironmental1, setQstEnvironmental1] = useState(1);
    const [qstEnvironmental2, setQstEnvironmental2] = useState('Yes');
    const [qstEnvironmental3, setQstEnvironmental3] = useState('Yes');
    const [qstFinancial1, setQstFinancial1] = useState(1);
    const [qstFinancial2, setQstFinancial2] = useState('Completely disagree');
    const handleChangeFinancial2 = (event: any) => setQstFinancial2(event.target.value);
    const [qstFinancial3, setQstFinancial3] = useState('Yes');
    const [qstOccupational1, setQstOccupational1] = useState('Not at all');
    const handleChangeOccupational1 = (event: any) => setQstOccupational1(event.target.value);
    const [qstOccupational2, setQstOccupational2] = useState('Yes');

    const sendForm = async () => {
        const form = [{
            userId: session?.user?.id,
            qstUniversity: qstUniversity,
            qstYear: qstYear,
            qstSport: qstSport,
            qstSex: qstSex,
            qstIdol: qstIdol,
            qstEmotion1: qstEmotion1,
            qstEmotion2: qstEmotion2,
            qstEmotion3: qstEmotion3,
            qstPhysical1: qstPhysical1,
            qstPhysical2: qstPhysical2,
            qstPhysical3: qstPhysical3,
            qstMental1: qstMental1,
            qstMental2: qstMental2,
            qstSpiritual1: qstSpiritual1,
            qstSpiritual2: qstSpiritual2,
            qstSocial1: qstSocial1,
            qstSocial2: qstSocial2,
            qstSocial3: qstSocial3,
            qstEnvironmental1: qstEnvironmental1,
            qstEnvironmental2: qstEnvironmental2,
            qstEnvironmental3: qstEnvironmental3,
            qstFinancial1: qstFinancial1,
            qstFinancial2: qstFinancial2,
            qstFinancial3: qstFinancial3,
            qstOccupational1: qstOccupational1,
            qstOccupational2: qstOccupational2,
        }]

        const res = await fetch(props.url + "form", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })

        if (res.status.toString() === "200") {
            const update = { ...props.user, filledForm: true }
            const result = await fetch(props.url + "users/" + session?.user?.id, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(update),
            })
            if (result.status.toString() === "200") {
                Router.push("/");
            } else {
                console.log("error detected.");
            }
        } else {
            console.log("error detected.");
        }
    }

    return (
        <Center>
            <Box width={'60vw'}>
                <VStack spacing='40px' pb={4}>
                    <Heading>Form</Heading>

                    <FormControl isRequired>
                        <FormLabel textAlign='center'>What is your university ?</FormLabel>
                        <Input placeholder='University name' value={qstUniversity} onChange={handleChangeUniversity} />
                    </FormControl>


                    <FormControl isRequired>
                        <FormLabel textAlign='center'>What is your year ?</FormLabel>
                        <Input placeholder='What is your year?' value={qstYear} onChange={handleChangeYear} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel textAlign='center'>What sport do you play ?</FormLabel>
                        <Input placeholder='Sport' value={qstSport} onChange={handleChangeSport} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel textAlign='center'>What is your sex ?</FormLabel>
                        <Input placeholder='Sex' value={qstSex} onChange={handleChangeSex} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel textAlign='center'>What is your idol ?</FormLabel>
                        <Input placeholder='idol name' value={qstIdol} onChange={handleChangeIdol} />
                    </FormControl>

                    <Text color="gray" fontSize={30}>Emotional</Text>
                    <FormControl as='fieldset' isRequired>
                        <Center>
                            <FormLabel textAlign='center' as='legend' color="teal" fontSize={15}>Do you feel confident in your ability to manage emotions (i.e. anxiety, joy, anger, frustration)?</FormLabel>
                        </Center>
                        <Select value={qstEmotion1} onChange={handleChangeEmotion1}>
                            <option>Not at all</option>
                            <option>A little</option>
                            <option>Moderately</option>
                            <option>Quite a bit</option>
                            <option>A lot</option>
                        </Select>
                    </FormControl>
                    <FormControl as='fieldset' isRequired>
                        <Center>
                            <FormLabel textAlign='center' as='legend' color="teal" fontSize={15}>Do you feel comfortable with all emotions, using them in your best interest?</FormLabel>
                        </Center>
                        <Select value={qstEmotion2} onChange={handleChangeEmotion2}>
                            <option>Not at all</option>
                            <option>A little</option>
                            <option>Moderately</option>
                            <option>Quite a bit</option>
                            <option>A lot</option>
                        </Select>
                    </FormControl>
                    <FormControl as='fieldset' isRequired>
                        <Center>
                            <FormLabel textAlign='center' as='legend' color="teal" fontSize={15}>On a scale from 1 to 10 (10 being the most), how important is it in your current life to improve your knowledge on emotions and work on it?</FormLabel>
                        </Center>
                        <Slider
                            aria-label='slider-ex-6'
                            onChange={setQstEmotion3}
                            min={1} max={10} step={1}
                            defaultValue={1}
                        >
                            <SliderMark
                                value={qstEmotion3}
                                textAlign='center'
                                bg='black'
                                color='white'
                                mt='4'
                                ml='-6'
                                w='12'
                            >
                                {qstEmotion3}
                            </SliderMark>
                            <SliderTrack>
                                <SliderFilledTrack bg='black' />
                            </SliderTrack>
                            <SliderThumb boxSize={6}>
                                <Box color='black' />
                            </SliderThumb>
                        </Slider>
                    </FormControl>
                    <Text color="gray" fontSize={30}>Physical</Text>
                    <FormControl as='fieldset' isRequired>
                        <Center>
                            <FormLabel textAlign='center' as='legend' color="teal" fontSize={15}>Do you feel confident in your knowledge about nutrition, sleep, possible injuries, and your appearance to feel comfortable and happy?</FormLabel>
                        </Center>
                        <Select value={qstPhysical1} onChange={handleChangePhysical1}>
                            <option>Not at all</option>
                            <option>A little</option>
                            <option>Moderately</option>
                            <option>Quite a bit</option>
                            <option>A lot</option>
                        </Select>
                    </FormControl>
                    <FormControl as='fieldset' isRequired>
                        <Center>
                            <FormLabel textAlign='center' as='legend' color="teal" fontSize={15}>Is it important for you to improve these topics and your ability to master the Physical pillar?</FormLabel>
                        </Center>
                        <RadioGroup onChange={setQstPhysical2} value={qstPhysical2}>
                            <Center>
                                <HStack spacing='24px'>
                                    <Radio colorScheme='blackAlpha' value='Yes'>Yes</Radio>
                                    <Radio colorScheme='blackAlpha' value='No'>No</Radio>
                                </HStack>
                            </Center>
                        </RadioGroup>
                    </FormControl>
                    <FormControl as='fieldset' isRequired>
                        <Center>
                            <FormLabel textAlign='center' as='legend' color="teal" fontSize={15}>Which one would you like to improve the most?</FormLabel>
                        </Center>
                        <Select value={qstPhysical3} onChange={handleChangePhysical3}>
                            <option>Nutrition</option>
                            <option>Sleep</option>
                            <option>Potential Injury</option>
                            <option>Your Look</option>
                        </Select>
                    </FormControl>
                    <Text color="gray" fontSize={30}>Mental</Text>
                    <FormControl as='fieldset' isRequired>
                        <Center>
                            <FormLabel textAlign='center' as='legend' color="teal" fontSize={15}>I have a healthy and positive mindset and I always tend to prioritize my mental health</FormLabel>
                        </Center>
                        <Select value={qstMental1} onChange={handleChangeMental1}>
                            <option>Not at all</option>
                            <option>A little</option>
                            <option>Moderately</option>
                            <option>Quite a bit</option>
                            <option>A lot</option>
                        </Select>
                    </FormControl>
                    <FormControl as='fieldset' isRequired>
                        <Center>
                            <FormLabel textAlign='center' as='legend' color="teal" fontSize={15}>I would like to work more on these areas to develop a mindset that helps with clarity, confidence, the ability to learn new skills, be creative, and think independently</FormLabel>
                        </Center>
                        <RadioGroup onChange={setQstMental2} value={qstMental2}>
                            <Center>
                                <HStack spacing='24px'>
                                    <Radio colorScheme='blackAlpha' value='Yes'>Yes</Radio>
                                    <Radio colorScheme='blackAlpha' value='No'>No</Radio>
                                </HStack>
                            </Center>
                        </RadioGroup>
                    </FormControl>
                    <Text color="gray" fontSize={30}>Spiritual</Text>
                    <FormControl as='fieldset' isRequired>
                        <Center>
                            <FormLabel textAlign='center' as='legend' color="teal" fontSize={15}>I feel that I have a great purpose in life</FormLabel>
                        </Center>
                        <Select value={qstSpiritual1} onChange={handleChangeSpiritual1}>
                            <option>Not at all</option>
                            <option>A little</option>
                            <option>Moderately</option>
                            <option>Quite a bit</option>
                            <option>A lot</option>
                        </Select>
                    </FormControl>
                    <FormControl as='fieldset' isRequired>
                        <Center>
                            <FormLabel textAlign='center' as='legend' color="teal" fontSize={15}>Would you like to work on your personal growth by finding inner peace and living each day to the fullest with mindfulness and happiness?</FormLabel>
                        </Center>
                        <RadioGroup onChange={setQstSpiritual2} value={qstSpiritual2}>
                            <Center>
                                <HStack spacing='24px'>
                                    <Radio colorScheme='blackAlpha' value='Yes'>Yes</Radio>
                                    <Radio colorScheme='blackAlpha' value='No'>No</Radio>
                                </HStack>
                            </Center>
                        </RadioGroup>
                    </FormControl>
                    <Text color="gray" fontSize={30}>Social</Text>
                    <FormControl as='fieldset' isRequired>
                        <Center>
                            <FormLabel textAlign='center' as='legend' color="teal" fontSize={15}>Do you feel a sense of connection and belonging in your social life?</FormLabel>
                        </Center>
                        <Select value={qstSocial1} onChange={handleChangeSocial1}>
                            <option>Not at all</option>
                            <option>A little</option>
                            <option>Moderately</option>
                            <option>Quite a bit</option>
                            <option>A lot</option>
                        </Select>
                    </FormControl>
                    <FormControl as='fieldset' isRequired>
                        <Center>
                            <FormLabel textAlign='center' as='legend' color="teal" fontSize={15}>Are you surrounded by meaningful, supportive, and positive people that make you feel safe, respected, and accepted?</FormLabel>
                        </Center>
                        <Select value={qstSocial2} onChange={handleChangeSocial2}>
                            <option>Not at all</option>
                            <option>A little</option>
                            <option>Moderately</option>
                            <option>Quite a bit</option>
                            <option>A lot</option>
                        </Select>
                    </FormControl>
                    <FormControl as='fieldset' isRequired>
                        <Center>
                            <FormLabel textAlign='center' as='legend' color="teal" fontSize={15}>Do you desire to learn additional skills to connect with people and develop more healthy relationships?</FormLabel>
                        </Center>
                        <RadioGroup onChange={setQstSocial3} value={qstSocial3}>
                            <Center>
                                <HStack spacing='24px'>
                                    <Radio colorScheme='blackAlpha' value='Yes'>Yes</Radio>
                                    <Radio colorScheme='blackAlpha' value='No'>No</Radio>
                                </HStack>
                            </Center>
                        </RadioGroup>
                    </FormControl>
                    <Text color="gray" fontSize={30}>Environmental</Text>
                    <FormControl as='fieldset' isRequired>
                        <Center>
                            <FormLabel textAlign='center' as='legend' color="teal" fontSize={15}>From a scale to 1 to 10, I respect my own personal environment and the environment around me, e.g. The air, water, earth.</FormLabel>
                        </Center>
                        <Slider
                            aria-label='slider-ex-6'
                            onChange={setQstEnvironmental1}
                            min={1} max={10} step={1}
                            defaultValue={1}
                        >
                            <SliderMark
                                value={qstEnvironmental1}
                                textAlign='center'
                                bg='black'
                                color='white'
                                mt='4'
                                ml='-6'
                                w='12'
                            >
                                {qstEnvironmental1}
                            </SliderMark>
                            <SliderTrack>
                                <SliderFilledTrack bg='black' />
                            </SliderTrack>
                            <SliderThumb boxSize={6}>
                                <Box color='black' />
                            </SliderThumb>
                        </Slider>
                    </FormControl>
                    <FormControl as='fieldset' isRequired>
                        <Center>
                            <FormLabel textAlign='center' as='legend' color="teal" fontSize={15}>Did you know that your environment has a direct impact on your mindset, creativity, and productivity?</FormLabel>
                        </Center>
                        <RadioGroup onChange={setQstEnvironmental2} value={qstEnvironmental2}>
                            <Center>
                                <HStack spacing='24px'>
                                    <Radio colorScheme='blackAlpha' value='Yes'>Yes</Radio>
                                    <Radio colorScheme='blackAlpha' value='No'>No</Radio>
                                </HStack>
                            </Center>
                        </RadioGroup>
                    </FormControl>
                    <FormControl as='fieldset' isRequired>
                        <Center>
                            <FormLabel textAlign='center' as='legend' color="teal" fontSize={15}>Would you like to learn more about how you can support your surroundings?</FormLabel>
                        </Center>
                        <RadioGroup onChange={setQstEnvironmental3} value={qstEnvironmental3}>
                            <Center>
                                <HStack spacing='24px'>
                                    <Radio colorScheme='blackAlpha' value='Yes'>Yes</Radio>
                                    <Radio colorScheme='blackAlpha' value='No'>No</Radio>
                                </HStack>
                            </Center>
                        </RadioGroup>
                    </FormControl>
                    <Text color="gray" fontSize={30}>Financial</Text>
                    <FormControl as='fieldset' isRequired>
                        <Center>
                            <FormLabel textAlign='center' as='legend' color="teal" fontSize={15}>On a scale from 1 to 10, I know how to manage my financial expenses and avoid financial stress</FormLabel>
                        </Center>
                        <Slider
                            aria-label='slider-ex-6'
                            onChange={setQstFinancial1}
                            min={1} max={10} step={1}
                            defaultValue={1}
                        >
                            <SliderMark
                                value={qstFinancial1}
                                textAlign='center'
                                bg='black'
                                color='white'
                                mt='4'
                                ml='-6'
                                w='12'
                            >
                                {qstFinancial1}
                            </SliderMark>
                            <SliderTrack>
                                <SliderFilledTrack bg='black' />
                            </SliderTrack>
                            <SliderThumb boxSize={6}>
                                <Box color='black' />
                            </SliderThumb>
                        </Slider>
                    </FormControl>
                    <FormControl as='fieldset' isRequired>
                        <Center>
                            <FormLabel textAlign='center' as='legend' color="teal" fontSize={15}>I want to learn to manage my financials more consistently and thoughtfully</FormLabel>
                        </Center>
                        <Select value={qstFinancial2} onChange={handleChangeFinancial2}>
                            <option>Completely disagree</option>
                            <option>Disagree</option>
                            <option>Somewhat agree</option>
                            <option>Agree</option>
                            <option>Completely agree</option>
                        </Select>
                    </FormControl>
                    <FormControl as='fieldset' isRequired>
                        <Center>
                            <FormLabel textAlign='center' as='legend' color="teal" fontSize={15}>Would you like to learn more about your relationship with money and how to take care of this area to help your mind and quality of life?</FormLabel>
                        </Center>
                        <RadioGroup onChange={setQstFinancial3} value={qstFinancial3}>
                            <Center>
                                <HStack spacing='24px'>
                                    <Radio colorScheme='blackAlpha' value='Yes'>Yes</Radio>
                                    <Radio colorScheme='blackAlpha' value='No'>No</Radio>
                                </HStack>
                            </Center>
                        </RadioGroup>
                    </FormControl>
                    <Text color="gray" fontSize={30}>Occupational</Text>
                    <FormControl as='fieldset' isRequired>
                        <Center>
                            <FormLabel textAlign='center' as='legend' color="teal" fontSize={15}>Do you feel that you have created a healthy work-life balance</FormLabel>
                        </Center>
                        <Select value={qstOccupational1} onChange={handleChangeOccupational1}>
                            <option>Not at all</option>
                            <option>A little</option>
                            <option>Moderately</option>
                            <option>Quite a bit</option>
                            <option>A lot</option>
                        </Select>
                    </FormControl>
                    <FormControl as='fieldset' isRequired>
                        <Center>
                            <FormLabel textAlign='center' as='legend' color="teal" fontSize={15}>Would you like to learn more about how not to feel overwhelmed at work, avoid burnout, feel challenged, and continuously develop new skills?</FormLabel>
                        </Center>
                        <RadioGroup onChange={setQstOccupational2} value={qstOccupational2}>
                            <Center>
                                <HStack spacing='24px'>
                                    <Radio colorScheme='blackAlpha' value='Yes'>Yes</Radio>
                                    <Radio colorScheme='blackAlpha' value='No'>No</Radio>
                                </HStack>
                            </Center>
                        </RadioGroup>
                    </FormControl>
                    <Button mt={4} mb={4} colorScheme='teal' onClick={() => sendForm()}>Valider</Button>
                </VStack>
            </Box>
        </Center>


    );
};

export default form;

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    const res = await fetch(process.env.API_URL + "users/" + session?.user?.id);
    const user = await res.json()
    return {
        props: {
            user: user,
            url: process.env.API_URL
        }
    }
}