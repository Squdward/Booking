import { Button, Group, Input, PasswordInput, Space } from "@mantine/core"
import { useUnit } from "effector-react"
import { $errors, $isDirty, $settings, changeEvent, getUser, onSubmit, } from "../../models/settings"
import { useEffect } from "react";

const Settings = () => {
    const [data, onChange, isDirty, fetchUserData, onSubmitHandler, errors] = useUnit([$settings, changeEvent, $isDirty, getUser, onSubmit, $errors]);

    useEffect(() => {
        fetchUserData();
    },[])


    return (
        <section>
            <h1>Личные данные </h1>

            <form onSubmit={e => {
                    e.preventDefault();
                    onSubmitHandler();
                }}>
                <Group>
                    <Input.Wrapper label="Имя" error={errors.name}>
                        <Input value={data.name} onChange={(e) => onChange({name: 'name', value: e.target.value})} placeholder="Ваше имя" />
                    </Input.Wrapper>

                    <Input.Wrapper label="Фамилия" error={errors.secondName}>
                        <Input value={data.secondName} onChange={(e) => onChange({name: 'secondName', value: e.target.value})} placeholder="Ваша Фамилия" />
                    </Input.Wrapper>

                    <Input.Wrapper label="Номер телефона" error={errors.phone}>
                        <Input value={data.phone} onChange={(e) => onChange({name: 'phone', value: e.target.value})} placeholder="Номер телефона" />
                    </Input.Wrapper>

                    <Input.Wrapper w={158} label="Пароль" error={errors.password}>
                        <PasswordInput value={data.password} onChange={(e) => onChange({name: 'password', value: e.target.value})} placeholder="Пароль" />
                    </Input.Wrapper>

                    <Input.Wrapper label="email" error={errors.password}>
                        <Input value={data.email} onChange={(e) => onChange({name: 'password', value: e.target.value})} placeholder="Пароль" />
                    </Input.Wrapper>

                    <Input.Wrapper w={158} label="Адрес" error={errors.adres}>
                        <Input value={data.adres} onChange={(e) => onChange({name: 'adres', value: e.target.value})} placeholder="Адрес" />
                    </Input.Wrapper>
                </Group>
                
                <Space h={40}/>

                <Button disabled={!isDirty} type="submit">Сохранить</Button>
            </form>
        </section>
    )
}


export {Settings}