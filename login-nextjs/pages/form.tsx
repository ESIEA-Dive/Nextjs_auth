import { Heading, Text, Center, VStack, HStack, RadioGroup, Radio, Button, FormControl, FormLabel } from "@chakra-ui/react";
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

    const [qstEmotion1, setQstEmotion1] = useState('Not at all');
    const [qstEmotion2, setQstEmotion2] = useState('Not at all');
    const [qstEmotion3, setQstEmotion3] = useState('1');
    const [qstPhysical1, setQstPhysical1] = useState('Not at all');
    const [qstPhysical2, setQstPhysical2] = useState('Yes');
    const [qstPhysical3, setQstPhysical3] = useState('Nutrition');
    const [qstMental1, setQstMental1] = useState('Not at all');
    const [qstMental2, setQstMental2] = useState('Yes');
    const [qstSpiritual1, setQstSpiritual1] = useState('Not at all');
    const [qstSpiritual2, setQstSpiritual2] = useState('Yes');
    const [qstSocial1, setQstSocial1] = useState('Not at all');
    const [qstSocial2, setQstSocial2] = useState('Not at all');
    const [qstSocial3, setQstSocial3] = useState('Yes');
    const [qstEnvironmental1, setQstEnvironmental1] = useState('1');
    const [qstEnvironmental2, setQstEnvironmental2] = useState('Yes');
    const [qstEnvironmental3, setQstEnvironmental3] = useState('Yes');
    const [qstFinancial1, setQstFinancial1] = useState('1');
    const [qstFinancial2, setQstFinancial2] = useState('Completely disagree');
    const [qstFinancial3, setQstFinancial3] = useState('Yes');
    const [qstOccupational1, setQstOccupational1] = useState('Not at all');
    const [qstOccupational2, setQstOccupational2] = useState('Yes');

    const sendForm = async () => {
        const form = [{
            userId: session?.user?.id,
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
            <VStack spacing='24px' pb={4}>
                <Heading>Form</Heading>
                <Text color="gray" fontSize={30}>Emotional</Text>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>Do you feel confident in your ability to manage emotions (i.e. anxiety, joy, anger, frustration)?</FormLabel>
                    </Center>
                    <RadioGroup onChange={setQstEmotion1} value={qstEmotion1}>
                        <Center>
                            <HStack spacing='24px'>
                                <Radio value='Not at all'>Not at all</Radio>
                                <Radio value='A little'>A little</Radio>
                                <Radio value='Moderately'>Moderately</Radio>
                                <Radio value='Quite a bit'>Quite a bit</Radio>
                                <Radio value='A lot'>A lot</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>Do you feel comfortable with all emotions, using them in your best interest?</FormLabel>
                    </Center>
                    <RadioGroup onChange={setQstEmotion2} value={qstEmotion2}>
                        <Center>
                            <HStack spacing='24px'>
                                <Radio value='Not at all'>Not at all</Radio>
                                <Radio value='A little'>A little</Radio>
                                <Radio value='Moderately'>Moderately</Radio>
                                <Radio value='Quite a bit'>Quite a bit</Radio>
                                <Radio value='A lot'>A lot</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>On a scale from 1 to 10 (10 being the most), how important is it in your current life to improve your knowledge on emotions and work on it?</FormLabel>
                    </Center>
                    <RadioGroup onChange={setQstEmotion3} value={qstEmotion3}>
                        <Center>
                            <HStack spacing='24px'>
                                <Radio value='1'>1</Radio>
                                <Radio value='2'>2</Radio>
                                <Radio value='3'>3</Radio>
                                <Radio value='4'>4</Radio>
                                <Radio value='5'>5</Radio>
                                <Radio value='6'>6</Radio>
                                <Radio value='7'>7</Radio>
                                <Radio value='8'>8</Radio>
                                <Radio value='9'>9</Radio>
                                <Radio value='10'>10</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
                <Text color="gray" fontSize={30}>Physical</Text>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>Do you feel confident in your knowledge about nutrition, sleep, possible injuries, and your appearance to feel comfortable and happy?</FormLabel>
                    </Center>
                    <RadioGroup onChange={setQstPhysical1} value={qstPhysical1}>
                        <Center>
                            <HStack spacing='24px'>
                                <Radio value='Not at all'>Not at all</Radio>
                                <Radio value='A little'>A little</Radio>
                                <Radio value='Moderately'>Moderately</Radio>
                                <Radio value='Quite a bit'>Quite a bit</Radio>
                                <Radio value='A lot'>A lot</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>Is it important for you to improve these topics and your ability to master the Physical pillar?</FormLabel>
                    </Center>
                    <RadioGroup onChange={setQstPhysical2} value={qstPhysical2}>
                        <Center>
                            <HStack spacing='24px'>
                                <Radio value='Yes'>Yes</Radio>
                                <Radio value='No'>No</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>Which one would you like to improve the most?</FormLabel>
                    </Center>
                    <RadioGroup onChange={setQstPhysical3} value={qstPhysical3}>
                        <Center>
                            <HStack spacing='24px'>
                                <Radio value='Nutrition'>Nutrition</Radio>
                                <Radio value='Sleep'>Sleep</Radio>
                                <Radio value='Potential Injury'>Potential Injury</Radio>
                                <Radio value='Your Look'>Your Look</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
                <Text color="gray" fontSize={30}>Mental</Text>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>I have a healthy and positive mindset and I always tend to prioritize my mental health</FormLabel>
                    </Center>
                    <RadioGroup onChange={setQstMental1} value={qstMental1}>
                        <Center>
                            <HStack spacing='24px'>
                                <Radio value='Not at all'>Not at all</Radio>
                                <Radio value='A little'>A little</Radio>
                                <Radio value='Moderately'>Moderately</Radio>
                                <Radio value='Quite a bit'>Quite a bit</Radio>
                                <Radio value='A lot'>A lot</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>I would like to work more on these areas to develop a mindset that helps with clarity, confidence, the ability to learn new skills, be creative, and think independently</FormLabel>
                    </Center>
                    <RadioGroup onChange={setQstMental2} value={qstMental2}>
                        <Center>
                            <HStack spacing='24px'>
                                <Radio value='Yes'>Yes</Radio>
                                <Radio value='No'>No</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
                <Text color="gray" fontSize={30}>Spiritual</Text>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>I feel that I have a great purpose in life</FormLabel>
                    </Center>
                    <RadioGroup onChange={setQstSpiritual1} value={qstSpiritual1}>
                        <Center>
                            <HStack spacing='24px'>
                                <Radio value='Not at all'>Not at all</Radio>
                                <Radio value='A little'>A little</Radio>
                                <Radio value='Moderately'>Moderately</Radio>
                                <Radio value='Quite a bit'>Quite a bit</Radio>
                                <Radio value='A lot'>A lot</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>Would you like to work on your personal growth by finding inner peace and living each day to the fullest with mindfulness and happiness?</FormLabel>
                    </Center>
                    <RadioGroup onChange={setQstSpiritual2} value={qstSpiritual2}>
                        <Center>
                            <HStack spacing='24px'>
                                <Radio value='Yes'>Yes</Radio>
                                <Radio value='No'>No</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
                <Text color="gray" fontSize={30}>Social</Text>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>Do you feel a sense of connection and belonging in your social life?</FormLabel>
                    </Center>
                    <RadioGroup onChange={setQstSocial1} value={qstSocial1}>
                        <Center>
                            <HStack spacing='24px'>
                                <Radio value='Not at all'>Not at all</Radio>
                                <Radio value='A little'>A little</Radio>
                                <Radio value='Moderately'>Moderately</Radio>
                                <Radio value='Quite a bit'>Quite a bit</Radio>
                                <Radio value='A lot'>A lot</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>Are you surrounded by meaningful, supportive, and positive people that make you feel safe, respected, and accepted?</FormLabel>
                    </Center>
                    <RadioGroup onChange={setQstSocial2} value={qstSocial2}>
                        <Center>
                            <HStack spacing='24px'>
                                <Radio value='Not at all'>Not at all</Radio>
                                <Radio value='A little'>A little</Radio>
                                <Radio value='Moderately'>Moderately</Radio>
                                <Radio value='Quite a bit'>Quite a bit</Radio>
                                <Radio value='A lot'>A lot</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>Do you desire to learn additional skills to connect with people and develop more healthy relationships?</FormLabel>
                    </Center>
                    <RadioGroup onChange={setQstSocial3} value={qstSocial3}>
                        <Center>
                            <HStack spacing='24px'>
                                <Radio value='Yes'>Yes</Radio>
                                <Radio value='No'>No</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
                <Text color="gray" fontSize={30}>Environmental</Text>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>From a scale to 1 to 10, I respect my own personal environment and the environment around me, e.g. The air, water, earth.</FormLabel>
                    </Center>
                    <RadioGroup onChange={setQstEnvironmental1} value={qstEnvironmental1}>
                        <Center>
                            <HStack spacing='24px'>
                                <Radio value='1'>1</Radio>
                                <Radio value='2'>2</Radio>
                                <Radio value='3'>3</Radio>
                                <Radio value='4'>4</Radio>
                                <Radio value='5'>5</Radio>
                                <Radio value='6'>6</Radio>
                                <Radio value='7'>7</Radio>
                                <Radio value='8'>8</Radio>
                                <Radio value='9'>9</Radio>
                                <Radio value='10'>10</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>Did you know that your environment has a direct impact on your mindset, creativity, and productivity?</FormLabel>
                    </Center>
                    <RadioGroup onChange={setQstEnvironmental2} value={qstEnvironmental2}>
                        <Center>
                            <HStack spacing='24px'>
                                <Radio value='Yes'>Yes</Radio>
                                <Radio value='No'>No</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>Would you like to learn more about how you can support your surroundings?</FormLabel>
                    </Center>
                    <RadioGroup onChange={setQstEnvironmental3} value={qstEnvironmental3}>
                        <Center>
                            <HStack spacing='24px'>
                                <Radio value='Yes'>Yes</Radio>
                                <Radio value='No'>No</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
                <Text color="gray" fontSize={30}>Financial</Text>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>On a scale from 1 to 10, I know how to manage my financial expenses and avoid financial stress</FormLabel>
                    </Center>
                    <RadioGroup onChange={setQstFinancial1} value={qstFinancial1}>
                        <Center>
                            <HStack spacing='24px'>
                                <Radio value='1'>1</Radio>
                                <Radio value='2'>2</Radio>
                                <Radio value='3'>3</Radio>
                                <Radio value='4'>4</Radio>
                                <Radio value='5'>5</Radio>
                                <Radio value='6'>6</Radio>
                                <Radio value='7'>7</Radio>
                                <Radio value='8'>8</Radio>
                                <Radio value='9'>9</Radio>
                                <Radio value='10'>10</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>I want to learn to manage my financials more consistently and thoughtfully</FormLabel>
                    </Center>
                    <RadioGroup onChange={setQstFinancial2} value={qstFinancial2}>
                        <Center>
                            <HStack spacing='24px'>
                                <Radio value='Completely disagree'>Completely disagree</Radio>
                                <Radio value='Disagree'>Disagree</Radio>
                                <Radio value='Somewhat agree'>Somewhat agree</Radio>
                                <Radio value='Agree'>Agree</Radio>
                                <Radio value='Completely agree'>Completely agree</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>Would you like to learn more about your relationship with money and how to take care of this area to help your mind and quality of life?</FormLabel>
                    </Center>
                    <RadioGroup onChange={setQstFinancial3} value={qstFinancial3}>
                        <Center>
                            <HStack spacing='24px'>
                                <Radio value='Yes'>Yes</Radio>
                                <Radio value='No'>No</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
                <Text color="gray" fontSize={30}>Occupational</Text>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>Do you feel that you have created a healthy work-life balance</FormLabel>
                    </Center>
                    <RadioGroup onChange={setQstOccupational1} value={qstOccupational1}>
                        <Center>
                            <HStack spacing='24px'>
                                <Radio value='Not at all'>Not at all</Radio>
                                <Radio value='A little'>A little</Radio>
                                <Radio value='Moderately'>Moderately</Radio>
                                <Radio value='Quite a bit'>Quite a bit</Radio>
                                <Radio value='A lot'>A lot</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>Would you like to learn more about how not to feel overwhelmed at work, avoid burnout, feel challenged, and continuously develop new skills?</FormLabel>
                    </Center>
                    <RadioGroup onChange={setQstOccupational2} value={qstOccupational2}>
                        <Center>
                            <HStack spacing='24px'>
                                <Radio value='Yes'>Yes</Radio>
                                <Radio value='No'>No</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
                <Button mt={4} mb={4} colorScheme='teal' onClick={() => sendForm()}>Valider</Button>
            </VStack>
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