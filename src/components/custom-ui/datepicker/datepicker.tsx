import { DatePicker, DateValue } from "@ark-ui/react/date-picker";
import { Portal } from "@ark-ui/react/portal";
import {
  Box,
  Center,
  Flex,
  HStack,
  IconButton,
  Input,
  mergeRefs,
} from "@chakra-ui/react";
import { LuCalendar, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { formatDate } from "date-fns";
import React from "react";

interface BasicDatePickerProps {
  value?: DateValue[];
  onChange?: (value: DateValue[]) => void;
  onDateChange?: (date: Date | null) => void;
  onTextChange?: (date: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  format?: string;
}
export interface DatePickerRef {
  getValue: () => string;
  getInput: () => HTMLInputElement | null;
}

export const BasicDatePicker = React.forwardRef<
  HTMLInputElement,
  BasicDatePickerProps
>(
  (
    {
      value,
      onChange,
      onDateChange,
      onTextChange,
      format = "yyyy/MM/dd",
      placeholder = "YYYY/MM/DD",
      disabled = false,
      readOnly = false,
    },
    ref
  ) => {
    // 今日の日付を取得
    const today = new Date();

    const formatValue = (date: DateValue) => {
      if (!date) return "";
      return formatDate(new Date(date.year, date.month - 1, date.day), format);
    };
    const handleValueChange = (newValue: DateValue[]) => {
      onChange?.(newValue);

      if (newValue?.[0]) {
        const date = new Date(
          newValue[0].year,
          newValue[0].month - 1,
          newValue[0].day
        );
        onDateChange?.(date);
        onTextChange?.(formatDate(date, format));
      } else {
        onDateChange?.(null);
        onTextChange?.(null);
      }
    };

    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
      <DatePicker.Root
        value={value}
        onValueChange={({ value }) => handleValueChange?.(value)}
        format={formatValue}
        disabled={disabled}
        readOnly={readOnly}
        positioning={{ placement: "bottom-start" }}
        asChild
      >
        <Box display={"flex"}>
          <DatePicker.Control>
            <HStack gap={2}>
              <DatePicker.Input asChild>
                <Input
                  ref={mergeRefs(ref, inputRef)}
                  size={"sm"}
                  placeholder={placeholder}
                />
              </DatePicker.Input>
              <DatePicker.Trigger asChild>
                <IconButton
                  bg={"bg.subtle"}
                  size={"sm"}
                  _hover={{
                    bg: "bg.muted",
                  }}
                  variant={"outline"}
                >
                  <LuCalendar />
                </IconButton>
              </DatePicker.Trigger>
            </HStack>
          </DatePicker.Control>
          <Portal>
            <DatePicker.Positioner>
              <DatePicker.Content asChild>
                <Box
                  boxShadow={"sm"}
                  bg={"bg.panel"}
                  zIndex={"popover"}
                  borderColor={"border"}
                  borderWidth={1}
                  borderRadius={"lg"}
                  p={5}
                  data-state="open"
                  animationDuration="slow"
                  animationStyle={{
                    _open: "slide-fade-in",
                    _closed: "slide-fade-out",
                  }}
                >
                  <DatePicker.View view="day">
                    <DatePicker.Context>
                      {(datePicker) => (
                        <>
                          <DatePicker.ViewControl>
                            <Flex my={1} gap="4" justify="space-between">
                              <DatePicker.PrevTrigger asChild>
                                <IconButton
                                  _hover={{ bg: "bg.alpha" }}
                                  variant={"ghost"}
                                >
                                  <LuChevronLeft />
                                </IconButton>
                              </DatePicker.PrevTrigger>
                              <DatePicker.ViewTrigger asChild>
                                <Button
                                  _hover={{ bg: "bg.alpha" }}
                                  fontWeight={600}
                                  variant={"ghost"}
                                >
                                  <DatePicker.RangeText />
                                </Button>
                              </DatePicker.ViewTrigger>
                              <DatePicker.NextTrigger asChild>
                                <IconButton
                                  _hover={{ bg: "bg.alpha" }}
                                  variant={"ghost"}
                                >
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
                                    <Center
                                      fontWeight={600}
                                      fontSize={"sm"}
                                      color={"fg.muted"}
                                      borderRadius={"lg"}
                                      p={1}
                                    >
                                      {weekDay.short}
                                    </Center>
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
                                      day.year === today.getFullYear();
                                    const isSelected =
                                      datePicker.value?.[0] &&
                                      day.day === datePicker.value[0].day &&
                                      day.month === datePicker.value[0].month &&
                                      day.year === datePicker.value[0].year;
                                    return (
                                      <DatePicker.TableCell
                                        key={id}
                                        value={day}
                                      >
                                        <DatePicker.TableCellTrigger asChild>
                                          <Button
                                            variant={"ghost"}
                                            bg={
                                              isSelected
                                                ? "orange.muted"
                                                : isToday
                                                  ? "bg.muted"
                                                  : undefined
                                            }
                                            _hover={{ bg: "bg.alpha" }}
                                            fontWeight={600}
                                            my={0.5}
                                            p={3}
                                          >
                                            {day.day}
                                          </Button>
                                        </DatePicker.TableCellTrigger>
                                      </DatePicker.TableCell>
                                    );
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
                            <Flex my={1} gap="4" justify="space-between">
                              <DatePicker.PrevTrigger asChild>
                                <IconButton
                                  _hover={{ bg: "bg.alpha" }}
                                  variant={"ghost"}
                                >
                                  <LuChevronLeft />
                                </IconButton>
                              </DatePicker.PrevTrigger>
                              <DatePicker.ViewTrigger asChild>
                                <Button
                                  _hover={{ bg: "bg.alpha" }}
                                  fontWeight={600}
                                  variant={"ghost"}
                                >
                                  <DatePicker.RangeText />
                                </Button>
                              </DatePicker.ViewTrigger>
                              <DatePicker.NextTrigger asChild>
                                <IconButton
                                  _hover={{ bg: "bg.alpha" }}
                                  variant={"ghost"}
                                >
                                  <LuChevronRight />
                                </IconButton>
                              </DatePicker.NextTrigger>
                            </Flex>
                          </DatePicker.ViewControl>
                          <DatePicker.Table>
                            <DatePicker.TableBody>
                              {datePicker
                                .getMonthsGrid({ columns: 4, format: "short" })
                                .map((months, id) => (
                                  <DatePicker.TableRow key={id}>
                                    {months.map((month, id) => (
                                      <DatePicker.TableCell
                                        key={id}
                                        value={month.value}
                                      >
                                        <DatePicker.TableCellTrigger asChild>
                                          <Button
                                            variant={"ghost"}
                                            _hover={{ bg: "bg.alpha" }}
                                            fontWeight={600}
                                            my={0.5}
                                            px={5}
                                            py={3}
                                          >
                                            {month.label}
                                          </Button>
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
                            <Flex my={1} gap="4" justify="space-between">
                              <DatePicker.PrevTrigger asChild>
                                <IconButton
                                  _hover={{ bg: "bg.alpha" }}
                                  variant={"ghost"}
                                >
                                  <LuChevronLeft />
                                </IconButton>
                              </DatePicker.PrevTrigger>
                              <DatePicker.ViewTrigger asChild>
                                <Button
                                  _hover={{ bg: "bg.alpha" }}
                                  fontWeight={600}
                                  variant={"ghost"}
                                >
                                  <DatePicker.RangeText />
                                </Button>
                              </DatePicker.ViewTrigger>
                              <DatePicker.NextTrigger asChild>
                                <IconButton
                                  _hover={{ bg: "bg.alpha" }}
                                  variant={"ghost"}
                                >
                                  <LuChevronRight />
                                </IconButton>
                              </DatePicker.NextTrigger>
                            </Flex>
                          </DatePicker.ViewControl>
                          <DatePicker.Table>
                            <DatePicker.TableBody>
                              {datePicker
                                .getYearsGrid({ columns: 4 })
                                .map((years, id) => (
                                  <DatePicker.TableRow key={id}>
                                    {years.map((year, id) => (
                                      <DatePicker.TableCell
                                        key={id}
                                        value={year.value}
                                      >
                                        <DatePicker.TableCellTrigger>
                                          <Button
                                            variant={"ghost"}
                                            _hover={{ bg: "bg.alpha" }}
                                            fontWeight={600}
                                            my={0.5}
                                            px={5}
                                            py={3}
                                          >
                                            {year.label}
                                          </Button>
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
    );
  }
);
BasicDatePicker.displayName = "BasicDatePicker";
