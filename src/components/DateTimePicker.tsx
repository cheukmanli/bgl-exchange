import React, { ChangeEvent } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import dayjs from "dayjs";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      minWidth: 240,
    },
  })
);

interface DateTimePickerProps {
  title: string;
  handleOnChangeValue: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function DateTimePicker(props: DateTimePickerProps) {
  const classes = useStyles();
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label={props.title}
        type="datetime-local"
        className={classes.textField}
        onChange={props.handleOnChangeValue}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
