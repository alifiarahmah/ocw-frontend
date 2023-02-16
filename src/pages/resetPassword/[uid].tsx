import Layout from "@/components/layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { EmailIcon, LockIcon, RepeatIcon } from "@chakra-ui/icons";
import {
    Container,
    Text,
    Stack,
    Heading,
    Divider,
    FormControl,
    HStack,
    Input,
    Spacer,
    Button,
    Stat,
    Flex,
    StatLabel,
    StatNumber,
    VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export default function ResetPassword() {
    const [filled, setFilled] = useState(false);
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();
    const router = useRouter();
    const uid = router.query.uid;

    // TODO: Get Validation from API
    const invalid = (uid: string | string[] | undefined) => {
        return uid != "123456";
    };

    const failCheck = (data: any) => {
        console.log(data);
        
        if (data.password.length < 5 || data.password.length > 16) {
            console.log('length');
            
            setError("Password length must be between 5-16 characters");
            console.log(error);
            
        } else if (data.password != data.repeat) {
            console.log('unsimilar');
            
            setError("Both passwords must be the same");
        } else {
            setError("");
        }

        console.log(error);
        
        if (error == "") return false;
        return true;
    };

    const onSubmit = (data: any) => {
        if (failCheck(data)) return;
    
        // TODO: Send Data to server
        setFilled(true);
    };

    useEffect(() => {
        // Workaround for annoying nodejs router bs
        if (!router.isReady) return;

        // Guard Clause for invalid uid
        if (invalid(uid)) {
            router.push("/404");
        }
    }, [router.isReady]);

    return (
        <>
            <Layout
                px={{ base: 5, md: 20 }}
                py={{ base: 5, md: 10 }}
                title={`Reset for `}
            >
                <Container
                    minW="70vw"
                    p="4rem"
                    bg={"white"}
                    borderRadius="lg"
                    mt={5}
                    centerContent
                >
                    {!filled ? (
                        <Stack
                            direction="column"
                            minH="25vh"
                            justifyContent={"space-evenly"}
                        >
                            <Heading as="h1" size="2xl" textAlign="center">
                                Silahkan Masukkan Password Baru
                            </Heading>
                            <Divider />
                            <Text fontSize={"lg"} textAlign="center">
                                Silahkan masukkan <b>password</b> anda yang
                                baru. Password harus memiliki panjang antara{" "}
                                <b>5-16 karakter</b>
                            </Text>
                            <FormControl onSubmit={handleSubmit(onSubmit)}>
                                <form>
                                    <Spacer boxSize={"5"} />
                                    <HStack>
                                        <LockIcon
                                            mr={"2rem"}
                                            boxSize={10}
                                            color={"blue.500"}
                                        />
                                        <Input
                                            {...register("password")}
                                            type="password"
                                            placeholder="Masukan Password Baru Anda di Sini"
                                            isRequired
                                        />
                                    </HStack>
                                    <Spacer boxSize={"5"} />
                                    <HStack>
                                        <RepeatIcon
                                            mr={"2rem"}
                                            boxSize={10}
                                            color={"blue.500"}
                                        />
                                        <Input
                                            {...register("repeat")}
                                            // isInvalid={}
                                            type="password"
                                            placeholder="Masukan Password Baru Anda di Sini"
                                            isRequired
                                        />
                                    </HStack>

                                    <Spacer boxSize={"10"} />
                                    <HStack>
                                        <Spacer />
                                        <Button
                                            type="submit"
                                            alignSelf={"right"}
                                            size="lg"
                                            bg={"blue.500"}
                                            color="white"
                                            fontWeight={"medium"}
                                        >
                                            Reset Password
                                        </Button>
                                    </HStack>
                                </form>
                            </FormControl>
                        </Stack>
                    ) : null}
                </Container>
            </Layout>
        </>
    );
}
