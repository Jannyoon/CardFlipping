const timeDiff = (time1:Date|null, time2: Date|null = new Date()) => {
  const diffTime1 =  time1 instanceof Date ? time1 : new Date();
  const diffTime2 =  time2 instanceof Date ? time2 : new Date();
  const difference = Math.abs(diffTime1.getTime() - diffTime2.getTime()); 

  const secInMs = Math.floor(difference / 1000);
  const minInMs = Math.floor(secInMs / 60);
  const hourInMs = Math.floor(minInMs / 60);
  const days = Math.floor(hourInMs / 24);

  const ms = difference % 1000;
  const seconds = secInMs % 60;
  const minutes = minInMs % 60;
  const hours = hourInMs % 24;

  return { difference, days, hours, minutes, seconds, ms };
};

export default timeDiff;