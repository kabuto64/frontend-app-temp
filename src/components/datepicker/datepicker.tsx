import { DatePicker } from '@ark-ui/react/date-picker'
import { Portal } from '@ark-ui/react/portal'
import { Box, Center, Flex, HStack, IconButton, Input } from '@chakra-ui/react'
import { LuCalendar, LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { Button } from '../ui/button'

export const Basic = () => {
// 今日の日付を取得
const today = new Date()

  return (
    <DatePicker.Root positioning={{ placement: 'bottom-start' }}  
    asChild>
      <Box display={"flex"}>
        <DatePicker.Control>
          <HStack gap={2}>
            <DatePicker.Input asChild>
              <Input size={"sm"} placeholder='日付を選択'/>
            </DatePicker.Input>
            <DatePicker.Trigger asChild>
              <IconButton bg={"bg.subtle"} size={"sm"} _hover={{
                bg: "bg.muted",
              }} variant={"outline"}>
                <LuCalendar />
              </IconButton>
            </DatePicker.Trigger>
          </HStack>
        </DatePicker.Control>
        <Portal>
          <DatePicker.Positioner>
            <DatePicker.Content asChild>
              <Box boxShadow={"lg"} bg={"bg.panel"} zIndex={"popover"} borderColor={"border"} borderWidth={1} borderRadius={"lg"} p={5}>
              <DatePicker.View view="day">
                <DatePicker.Context>
                  {(datePicker) => (
                    <>
                      <DatePicker.ViewControl>
                        <Flex my={1} gap="4" justify="space-between">
                          <DatePicker.PrevTrigger asChild>
                            <IconButton _hover={{bg:"bg.alpha"}} variant={"ghost"}>
                              <LuChevronLeft />
                            </IconButton>
                          </DatePicker.PrevTrigger>
                          <DatePicker.ViewTrigger asChild>
                            <Button _hover={{bg:"bg.alpha"}} fontWeight={700} variant={"ghost"}>
                              <DatePicker.RangeText />
                            </Button>
                          </DatePicker.ViewTrigger>
                          <DatePicker.NextTrigger asChild>
                            <IconButton _hover={{bg:"bg.alpha"}} variant={"ghost"}>
                              <LuChevronRight />
                            </IconButton>
                          </DatePicker.NextTrigger>
                        </Flex>
                      </DatePicker.ViewControl>
                      <DatePicker.Table>
                        <DatePicker.TableHead>
                          <DatePicker.TableRow>
                            {datePicker.weekDays.map((weekDay, id) => (
                              <DatePicker.TableHeader key={id}>
                                <Center fontWeight={600} fontSize={"sm"} color={"fg.muted"} borderRadius={"lg"} p={1}>{weekDay.short}</Center>
                              </DatePicker.TableHeader>
                            ))}
                          </DatePicker.TableRow>
                        </DatePicker.TableHead>
                        <DatePicker.TableBody>
                          {datePicker.weeks.map((week, id) => (
                            <DatePicker.TableRow key={id}>
                               {week.map((day, id) => {
                              // 日付が今日かどうかを判定
                              const isToday =
                                day.day === today.getDate() &&
                                day.month === today.getMonth() + 1 &&
                                day.year === today.getFullYear()
                              return (
                                <DatePicker.TableCell key={id} value={day}>
                                  <DatePicker.TableCellTrigger asChild>
                                    <Button variant={"ghost"} bg={isToday ? "bg.muted" : undefined} _hover={{bg:"bg.alpha"}} my={0.5} p={3}>{day.day}</Button>
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>
                              )
                            })}
                              
                            </DatePicker.TableRow>
                          ))}
                        </DatePicker.TableBody>
                      </DatePicker.Table>
                    </>
                  )}
                </DatePicker.Context>
              </DatePicker.View>
              <DatePicker.View view="month">
                <DatePicker.Context>
                  {(datePicker) => (
                    <>
                      <DatePicker.ViewControl>
                        <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                        <DatePicker.ViewTrigger>
                          <DatePicker.RangeText />
                        </DatePicker.ViewTrigger>
                        <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
                      </DatePicker.ViewControl>
                      <DatePicker.Table>
                        <DatePicker.TableBody>
                          {datePicker
                            .getMonthsGrid({ columns: 4, format: 'short' })
                            .map((months, id) => (
                              <DatePicker.TableRow key={id}>
                                {months.map((month, id) => (
                                  <DatePicker.TableCell key={id} value={month.value}>
                                    <DatePicker.TableCellTrigger>
                                      {month.label}
                                    </DatePicker.TableCellTrigger>
                                  </DatePicker.TableCell>
                                ))}
                              </DatePicker.TableRow>
                            ))}
                        </DatePicker.TableBody>
                      </DatePicker.Table>
                    </>
                  )}
                </DatePicker.Context>
              </DatePicker.View>
              <DatePicker.View view="year">
                <DatePicker.Context>
                  {(datePicker) => (
                    <>
                      <DatePicker.ViewControl>
                        <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                        <DatePicker.ViewTrigger>
                          <DatePicker.RangeText />
                        </DatePicker.ViewTrigger>
                        <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
                      </DatePicker.ViewControl>
                      <DatePicker.Table>
                        <DatePicker.TableBody>
                          {datePicker.getYearsGrid({ columns: 4 }).map((years, id) => (
                            <DatePicker.TableRow key={id}>
                              {years.map((year, id) => (
                                <DatePicker.TableCell key={id} value={year.value}>
                                  <DatePicker.TableCellTrigger>
                                    {year.label}
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>
                              ))}
                            </DatePicker.TableRow>
                          ))}
                        </DatePicker.TableBody>
                      </DatePicker.Table>
                    </>
                  )}
                </DatePicker.Context>
              </DatePicker.View>
              </Box>
            </DatePicker.Content>
          </DatePicker.Positioner>
        </Portal>
      </Box>
      
    </DatePicker.Root>
  )
}
