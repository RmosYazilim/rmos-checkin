import { LoginVoucher } from './login-with-voucher';
export const LoginMenubar = () => {
  return (
    <>
      <LoginVoucher />
    </>
    /*  <Tabs defaultValue="account">
      <TabsList className="w-full">
        <TabsTrigger value="account">Voucher</TabsTrigger>
        <TabsTrigger value="password">Surname</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <LoginVoucher />
      </TabsContent>
      <TabsContent value="password">
        <LoginSurname />
      </TabsContent>
    </Tabs> */
  );
};
