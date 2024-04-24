import { useUnit } from "effector-react";
import { $orders, getOrders } from "../../models/orders";
import { useEffect } from "react";
import { BookCard } from "../../../../shared/bookCard";
import { Accordion, Flex, Grid } from "@mantine/core";
import { STATUS_MAP } from "../../utils/statusMap";

const Orders = () => {
  const [data, getData] = useUnit([$orders, getOrders]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <section>
      <h1>Orders</h1>
    
      <Accordion chevronPosition="right" variant="contained">
        {data &&
          data.map((item) => {
            return (
              <Accordion.Item value={item._id} key={item._id}>
                <Accordion.Control>
                  <Flex justify="flex-start" align="center" gap={"md"}>
                    <h5>
                      Дата Создания:{" "}
                      {new Date(item.created).toLocaleDateString()}
                    </h5>

                    <span>Статус заказа: {STATUS_MAP[item.status]}</span>
                  </Flex>
                </Accordion.Control>
                <Accordion.Panel>
                    <Grid>
                    {item.products.map((product) => {
                        return (
                            <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                                <BookCard {...product.product} />
                            </Grid.Col>
                        )
                    })}
                    </Grid>
                </Accordion.Panel>
              </Accordion.Item>
            );
          })}
      </Accordion>
    </section>
  );
};

export { Orders };