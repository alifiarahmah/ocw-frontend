import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
    Heading,
    Text,
    Divider,
    Container,
    Stack,
    FormControl,
    Input,
    HStack,
    Button,
    Spacer,
    Stat,
    StatLabel,
    StatNumber,
    Flex,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";

export default function ResetPassword() {
    const router = useRouter();
    const [filled, setFilled] = useState(false);
    const [timeInSec, setTime] = useState(1800);
    const [destinationTime, setDT]: any[] = useState();
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        // TODO: Shoot Email
        setFilled(true);
        setDT(new Date().getTime() + 1800000);
    };

    const handleResend = () => {
        // TODO: Shoot Email
        setDT(new Date().getTime() + 1801000);
    };

    useEffect(() => {
        console.log("i ran");

        if (filled == true) {
            const interval = setInterval(() => {
                const diff = destinationTime - new Date().getTime();
                setTime(~~(diff / 1000));
                if (diff <= 999) {
                    router.push("/");
                }
            });
            return () => clearInterval(interval);
        }
    }, [filled, destinationTime]);

    return (
        <>
            <Layout
                px={{ base: 5, md: 20 }}
                py={{ base: 5, md: 10 }}
                title="Reset your Password"
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
                                Anda Melupakan Password?
                            </Heading>
                            <Divider />
                            <Text fontSize={"lg"} textAlign="center">
                                Untuk melakukan reset password silahkan
                                cantumkan <b>email</b> di bawah
                            </Text>
                            <FormControl onSubmit={handleSubmit(onSubmit)}>
                                <form>
                                    <HStack>
                                        <EmailIcon
                                            mr={"2rem"}
                                            boxSize={14}
                                            color={"blue.500"}
                                        />
                                        <Input
                                            {...register("email")}
                                            type="email"
                                            placeholder="Masukan Email Anda di Sini"
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
                                            Send Reset Email
                                        </Button>
                                    </HStack>
                                </form>
                            </FormControl>
                        </Stack>
                    ) : (
                        <Stack
                            direction="column"
                            minH="25vh"
                            justifyContent={"space-evenly"}
                        >
                            <Heading as="h1" size="lg" textAlign="center">
                                Pranala untuk mereset password sudah dikirim!
                            </Heading>
                            <Divider />
                            <Text fontSize={"lg"} textAlign="center">
                                Silakan periksa <b>email</b> Anda. Apabila tidak
                                ditemukan, periksa bagian <b>spam</b>
                            </Text>
                            <EmailIcon
                                mr={"2rem"}
                                boxSize={"2xs"}
                                color={"blue.500"}
                                placeSelf={"center"}
                            />
                            <Stat placeSelf={"center"}>
                                <Flex
                                    position={"relative"}
                                    direction={"column"}
                                >
                                    <StatLabel
                                        fontSize={"lg"}
                                        placeSelf={"center"}
                                    >
                                        Time Remaining:
                                    </StatLabel>
                                    <StatNumber
                                        fontSize={"9xl"}
                                        placeSelf={"center"}
                                    >
                                        {(~~(timeInSec / 60))
                                            .toString()
                                            .padStart(2, "0")}
                                        :
                                        {(timeInSec % 60)
                                            .toString()
                                            .padStart(2, "0")}
                                    </StatNumber>
                                    {timeInSec <= 3 ? (
                                        <Text
                                            bottom={0}
                                            position={"absolute"}
                                            color={"red.500"}
                                            placeSelf={"center"}
                                        >
                                            You will be redirected shortly.
                                        </Text>
                                    ) : (
                                        <Spacer />
                                    )}
                                </Flex>
                            </Stat>
                            <HStack>
                                <Spacer />
                                <Text>Email belum diterima?</Text>
                                <Button
                                    onClick={handleResend}
                                    size="md"
                                    bg={"blue.500"}
                                    color="white"
                                    fontWeight={"medium"}
                                >
                                    kirim ulang
                                </Button>
                            </HStack>
                        </Stack>
                    )}
                </Container>
            </Layout>
        </>
    );
}
