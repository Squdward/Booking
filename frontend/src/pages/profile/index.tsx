import { Space, Tabs } from "@mantine/core";
import { FC } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Settings } from "../../view/profile/ui/settings";
import { Orders } from "../../view/profile/ui/orders";
import { Fauvorite } from "../../view/profile/ui/fauvorite";


const content = [
	{
		value: "settings",
		label: "Settings",
		content: <Settings/>
	},
	{
		value: "orders",
		label: "Orders",
		content: <Orders/>
	},
	{
		value: "fauvorite",
		label: "Fauvorite",
		content: <Fauvorite/>
	},
]

const ProfilePage: FC = () => {
	const { path } = useParams();
	const navigate = useNavigate();

	const onChange = (value: string | null) => {
		if (value !== null) {
			navigate(`/profile/${value}`);
		}
	};

	return (
		<section>
			<Tabs value={path} defaultValue={'settings'} onChange={onChange}>
				<Tabs.List>
					{content.map( item => <Tabs.Tab key={item.value} value={item.value}>{item.label}</Tabs.Tab>)}
				</Tabs.List>
				<Space h={40}/>
				{content.map( item => <Tabs.Panel key={item.value + "Panel"} value={item.value}>{item.content}</Tabs.Panel>)}
			</Tabs>
			<Outlet />
		</section>
	);
};

export { ProfilePage };
