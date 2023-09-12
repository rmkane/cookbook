import { publishReview } from '../../../src/db/services/ReviewService'
import { update as reviewDalUpdate } from '../../../src/db/dal/review'

const reviewId = 10

jest.mock('../../../src/db/dal/review', () => ({
  update: jest.fn(),
}))

const mockDate = new Date()
const dateSpy = jest.spyOn(global, 'Date').mockReturnValue(mockDate)

describe('Review Service', () => {
  afterAll(() => {
    dateSpy.mockRestore()
  })

  describe('Publish', () => {
    it('should accept a payload and call the review dal with it', async () => {
      await publishReview(reviewId)

      expect(reviewDalUpdate).toBeCalledTimes(1)
      expect(reviewDalUpdate).toHaveBeenCalledWith(reviewId, {
        isPublished: true,
        publishedOn: new Date(),
      })
    })
  })
})
