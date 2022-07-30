import { Menu, Container, Button } from "semantic-ui-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
export const Navbar = () => {
  const router = useRouter();
  return (
    <Menu borderless attached>
      <Container>
        <Menu.Item>
          <Link href="/">
            <Image src="/favicon.ico" alt="logo" width={45} height={45} />
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button
              inverted
              color="primary"
              size="mini"
              onClick={() => router.push("/tasks/new")}
            >
              Add Task
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
