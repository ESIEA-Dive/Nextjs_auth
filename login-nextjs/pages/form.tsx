import { Heading, Text, Container, Center, VStack, HStack, RadioGroup, Radio, Image, Button, Input, FormControl, FormLabel, FormErrorMessage, FormHelperText} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

const form = () => {
    const { data: session } = useSession();

    return (
        <Center>
            <VStack spacing='24px'>
                <Heading>Form</Heading>
                <Text color="gray" fontSize={30}>Emotional</Text>
                <FormControl as='fieldset'>
                    <Center>
                        <FormLabel as='legend' color="teal" fontSize={15}>Do you feel confident in your ability to manage emotions (i.e. anxiety, joy, anger, frustration)?</FormLabel>
                    </Center>
                    <RadioGroup defaultValue='Not at all'>
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
                    <RadioGroup defaultValue='Not at all'>
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
                    <RadioGroup defaultValue='1'>
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
                    <RadioGroup defaultValue='Not at all'>
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
                    <RadioGroup defaultValue='Yes'>
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
                    <RadioGroup defaultValue='Nutrition'>
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
                    <RadioGroup defaultValue='Not at all'>
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
                    <RadioGroup defaultValue='Yes'>
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
                    <RadioGroup defaultValue='Not at all'>
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
                    <RadioGroup defaultValue='Yes'>
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
                    <RadioGroup defaultValue='Not at all'>
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
                    <RadioGroup defaultValue='Not at all'>
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
                    <RadioGroup defaultValue='Yes'>
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
                    <RadioGroup defaultValue='1'>
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
                    <RadioGroup defaultValue='Yes'>
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
                    <RadioGroup defaultValue='Yes'>
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
                    <RadioGroup defaultValue='1'>
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
                    <RadioGroup defaultValue='Completely disagree'>
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
                    <RadioGroup defaultValue='Yes'>
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
                    <RadioGroup defaultValue='Not at all'>
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
                    <RadioGroup defaultValue='Yes'>
                        <Center>
                            <HStack spacing='24px'>
                            <Radio value='Yes'>Yes</Radio>
                            <Radio value='No'>No</Radio>
                            </HStack>
                        </Center>
                    </RadioGroup>
                </FormControl>
            </VStack>
        </Center>


    );
    };
    
    export default form;