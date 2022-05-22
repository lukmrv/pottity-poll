import * as yup from "yup";

// eslint-disable-next-line import/prefer-default-export
// export const pollVoteSchema = yup.object().shape({
// 	// pollTopic: yup.string().max(5000).required("Provide topic of the poll"),
// 	options: yup
// 		.array()
// 		.of(
// 			yup.object().shape({
// 				value: yup.string().max(255),
// 			})
// 		)
// 		.test("At least two options are required", (item): any => {
// 			if (item?.length as number) {
// 				(item?.reduce((acc, e) => {
// 					if ((e.value?.length as number) > 0) {
// 						// eslint-disable-next-line no-param-reassign
// 						acc += 1;
// 					}
// 					return acc;
// 				}, 0) as number) > 1;
// 			}
// 		})
// 		.min(2),
// });
