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
                    <RadioGroup defaultValue='Not at all'>
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
            </VStack>
        </Center>


    );
    };
    
    export default form;